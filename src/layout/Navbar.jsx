import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

export const Navbar = () => {
    const [isMobileMenuOpen , setIsMobileOpen] = useState(false);
    const [isScrolled , setIsScrolled] = useState(false);
    useEffect(()=>{
      const handleScroll=() =>{
        if(window.scrollY>50){
          setIsScrolled(true)
        }else{
          setIsScrolled(false)
        }
      };
 window.addEventListener("scroll",handleScroll);

 return () => window.removeEventListener("scroll",handleScroll);
    },[]);
  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled ? "glass-strong py-3": "py-5 bg-transparent"} z-50`}>
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a className="text-xl font-bold tracking-tight hover:text-primary">
          T<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
        <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
          {navLinks.map((link,index) => (
            <a
              key={index}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          </div>
        </div>

        {/* CTA button  */}
        <div className="hidden md:block">
  <a href="#contact">
    <Button size="sm">Contact Me</Button>
  </a>
</div>

{/* Mobie menu  */}
        <button className="md:hidden p-2 text-foreground cursor-pointer" onClick={()=> setIsMobileOpen((prev)=>!prev)}>
            {isMobileMenuOpen ? <X/> : <Menu size={24}/> }
        </button>
      </nav>

      {/* Mobile Menu  */}
      {isMobileMenuOpen && (
      <div className="md:hidden glass-strong animate-fade-in">
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">  {navLinks.map((link,index) => (
            <a
              key={index}
              href={link.href}
              onClick={()=> setIsMobileOpen(false)}  className="text-lg text-muted-foreground hover:text-foreground py-2"
            >
              {link.label}
            </a>
          ))}
        <a href="#contact">
  <Button onClick={() => setIsMobileOpen(false)}>
    Contact Me
  </Button>
</a>
          </div>
      </div>
      )}
    </header>
  );
};
