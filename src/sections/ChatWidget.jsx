import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Paperclip } from "lucide-react";
import ReactMarkdown from 'react-markdown';
export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Tushar's AI assistant. Ask me anything about his projects, skills, or upload a Job Description to see if he's a fit!" }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Unique session ID for memory context
  const sessionIdRef = useRef(`session_${Math.random().toString(36).substring(2, 9)}`);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Handle Text Messages & Streaming
  const handleSend = async (userText) => {
    if (!userText.trim() || isGenerating) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
      { role: "assistant", content: "" }
    ]);

    setIsGenerating(true);

    try {
      const response = await fetch(`${backendUrl}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          message: userText
        })
      });

      if (response.status === 429) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = "⚠️ Rate limit reached. Please wait a minute before sending another message.";
          return updated;
        });
        setIsGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let partialData = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partialData += decoder.decode(value, { stream: true });
        const lines = partialData.split("\n\n");
        partialData = lines.pop(); 

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.content) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: updated[lastIdx].content + parsed.content
                  };
                  return updated;
                });
              }
            } catch (err) {
              console.error("JSON parse error:", err);
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = "Sorry, unable to connect to the backend server.";
        return updated;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Form Submit Wrapper
  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  // Handle File Uploads (PDF/DOCX)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed extensions
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid PDF or DOCX file.");
      return;
    }

    setIsUploading(true);
    
    // Add visual feedback to chat
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `📎 Uploaded Document: ${file.name}` }
    ]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("session_id", sessionIdRef.current);

    try {
      const response = await fetch(`${backendUrl}/api/chat/upload-jd`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 429) {
        alert("Upload rate limit reached. Please wait a minute.");
        setIsUploading(false);
        return;
      }

      if (response.ok) {
        // Automatically trigger the AI to analyze the uploaded document
        await handleSend("Please analyze the job description document I just uploaded and output the fit score exactly as requested in your rules.");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to process the uploaded document. Please try again." }
      ]);
    } finally {
      setIsUploading(false);
      // Reset input so user can upload same file again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:opacity-90 transition-all duration-300 animate-bounce"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">Ask AI About Me</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[75vh] md:h-[550px] max-h-[800px] rounded-2xl glass border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in bg-background/95 backdrop-blur-md">
          
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-primary/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-semibold text-sm">Tushar's Portfolio AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
               <div
  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
    msg.role === "user"
      ? "bg-primary text-primary-foreground rounded-br-none"
      : "bg-muted/50 border border-white/5 text-foreground rounded-bl-none"
  }`}
>
  {msg.content ? (
    <ReactMarkdown
      components={{
        // Style headings, lists, bold text, and paragraphs neatly
        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mb-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 mb-2" {...props} />,
        li: ({ node, ...props }) => <li className="text-sm" {...props} />,
      }}
    >
      {msg.content}
    </ReactMarkdown>
  ) : (
    <span className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...
    </span>
  )}
</div>
                
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={onSubmit} className="p-3 border-t border-white/10 flex items-center gap-2 shrink-0 bg-background/50">
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              hidden 
              ref={fileInputRef} 
              accept=".pdf,.docx" 
              onChange={handleFileUpload} 
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating || isUploading}
              title="Upload Job Description (PDF/DOCX)"
              className="p-2 text-muted-foreground hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or upload JD..."
              disabled={isGenerating || isUploading}
              className="flex-1 bg-muted/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 min-w-0"
            />
            
            <button
              type="submit"
              disabled={isGenerating || isUploading || !input.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};