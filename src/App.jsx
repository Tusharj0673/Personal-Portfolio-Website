import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "./layout/Footer";
import { ChatWidget } from "@/sections/ChatWidget";

function App() {

  return (
   <div className="min-h-screen overflow-x-hidden">
    <Navbar/>
    <main>
      <Hero/>
      <About/>
      <Projects/>
      <Experience/>
      <Contact/>
<ChatWidget />
    </main>
    <Footer/>
   </div>
  )
}

export default App;
