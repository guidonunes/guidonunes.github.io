import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Code2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const projects = [
    {
      title: "DCA Simulator",
      desc: "Financial simulator comparing Dollar Cost Averaging vs. Lump Sum strategies using historical market data.",
      tags: ["Spring Boot", "Next.js", "Java", "PostgreSQL"],
      links: {
        github: "https://github.com/guidonunes", // Replace with actual repo URL
        // demo: "#", // Uncomment if you have a live link later
      },
      image: "/project-dca.png", // Make sure this file exists in /public
    },
    {
      title: "SatoshiAI",
      desc: "Intelligent Financial Advisor Chatbot powered by Gemini. Combines market insights with emotional intelligence.",
      tags: ["Python", "Flask", "Gemini API", "JavaScript"],
      links: {
        github: "https://github.com/guidonunes",
      },
      image: "/project-satoshi.png",
    },
    {
      title: "Portfolio Pilot",
      desc: "Comprehensive portfolio tracker for Crypto and B3-listed stocks. Integrates Web3 data with real-time stock metrics.",
      tags: ["Ruby on Rails", "Bootstrap", "Chart.js"],
      links: {
        github: "https://github.com/guidonunes",
      },
      image: "/project-pilot.png",
    },
    {
      title: "Fintech Upside",
      desc: "Full-stack personal finance management platform focusing on expense tracking and budget planning.",
      tags: ["Spring Boot", "Next.js", "TypeScript", "Tailwind"],
      links: {
        github: "https://github.com/guidonunes",
      },
      image: "/project-upside.png",
    },
  ];

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto scrollbar-hide">

      {/* Header */}
      <div className="space-y-2 mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-cyan-500">
          <Code2 size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Selected Works</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-white/60 dark:hover:bg-white/10"
          >
            {/* Project Image Area */}
            <div className="relative h-40 w-full bg-slate-200 dark:bg-white/5 overflow-hidden">
              {/* This placeholder shows if image is missing */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <Terminal size={32} opacity={0.5} />
              </div>

              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <Github size={16} />
                  <span>View Code</span>
                </Link>
                {/* <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-500">
                   <ExternalLink size={16} /> Live Demo
                </Link>
                */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
