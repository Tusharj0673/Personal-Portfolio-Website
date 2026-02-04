import { Code2, Target, Users, Zap } from "lucide-react"

const highlights = [
    {
        icon : Code2,
        title: "Clean Code",
        description: "Writing maintainable code , assisting other developers to work with it faster.",
    },
    {
        icon : Zap,
        title: "Motivated",
        description: "Being self-motivated means I'm constantly auditing my own skills and seeking out the next level of excellence.",
    },
    {
        icon : Target,
        title: "Adaptable",
        description: "I bring a dynamic mindset and the technical agility to navigate evolving project requirements.",
    },
    {
        icon : Users,
        title: "Collaboration",
        description: "Working closely with teams to bring ideas to life.",
    },
]

export const About = () =>{
    return (<section id ="about" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                <div className="animate-fade-in">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">About me</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
                    Turning problems into clean,
                    <span className="font-serif italic font-normal text-white"> efficient & effective code.</span>
                </h2>

                 <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
             I am a self-motivated Full-Stack Developer dedicated to crafting high-performance, scalable applications. My technical journey is driven by a fascination with how code can solve real-world problems, leading me to master a diverse stack that bridges the gap between foundational logic and modern web architecture.
              </p>
              <p>
           On the frontend, I am familiar with building sleek, responsive interfaces using React, Next.js, and Tailwind CSS, often leveraging ShadCN UI for polished user experiences. My backend knowlegde lies in Node.js, Flask and SQL, while using Prisma and Supabase to manage data with precision. I have a particular interest in event-driven architecture, utilizing Inngest to handle complex background workflows.
              </p>
              <p>
          Beyond the syntax of Java, C, and Python, I am a firm believer in continuous learning and adaptability. Whether it's deploying on Vercel or collaborating via GitHub.
              </p>
            </div>

                   <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
            "I'm on a mission to bridge the gap between academic logic and real-world impact. My goal is to bring my adaptability and 'day-one' energy to a forward-thinking team. I believe in clean architecture and performance-first development and I'm ready to out-work and out-learn the challenges of tomorrow."
              </p>
            </div>
                </div>

                {/* Right Column - highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
 {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}

            </div>
            </div>
        </div>
    </section>
    );
}