import { ArrowUpRight, Github } from "lucide-react";
import {AnimatedBorderButton} from "@/components/AnimatedBorderButton";
const projects = [
  {
    title: "AI-Powered Finance Platform",
    description:
      "An application featuring AI-driven receipt scanning and automated monthly financial insights. Built with event-driven background jobs for real-time transaction tracking and automated email alerts.",
    image: "/projects/project1.png",
    tags: ["Next.js", "Inngest", "Supabase", "Prisma", "Tailwind CSS", "ShadCN UI"],
    link: "https://savvy-navy.vercel.app/",
    github: "https://github.com/Tusharj0673/Savvy",
  },
  {
    title: "Label_IQ - AI Driven Indian Food Label Analyzer",
    description:
      "A food safety platform featuring multi-modal AI-driven label scanning and automated FSSAI compliance reporting. Built with an event-driven architecture to process complex ingredient lists, the application provides real-time health risk alerts and personalized nutritional insights. Leveraging a multi-model AI pipeline, it combines OCR extraction, legal rule engines, and deep learning for automated, data-backed health transparency.",
    image: "/projects/project2.png",
    tags: ["React JS", "FastAPI", "MongoDB", "Vite","BERT NLP","SHAP","Knowledge Graph"],
    link: "https://label-iq-analyzer.vercel.app/",
    github: "https://github.com/Tusharj0673/food-label-analyzer",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              i worked on.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Currently showcasing two AI driven projects while actively developing new solutions. Two deep dives finished, many more in the pipeline.
          </p>
        </div>

        {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
                  />

                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                    <a
                      href={project.github}
                      className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};
