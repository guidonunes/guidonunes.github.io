import { User, Code2, Users, RefreshCw, CheckCircle, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const softSkills = [
    {
      icon: <LayoutTemplate size={20} />,
      title: "System Design",
      desc: "Thinking in scalable architectures, not just lines of code.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: <Users size={20} />,
      title: "Collaboration",
      desc: "Bridging the gap between technical and business teams.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Ownership",
      desc: "Taking full responsibility from feature concept to deployment.",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: <RefreshCw size={20} />,
      title: "Adaptability",
      desc: "Rapidly learning new stacks (Spring Boot & Flask) as needed.",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    // 'overflow-y-auto' handles scrolling if content gets too tall on mobile
    <div className="h-full w-full p-8 md:p-12 overflow-y-auto scrollbar-hide">

      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2 text-cyan-500">
          <User size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">About Me</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Beyond the Code
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column: The Narrative */}
        <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
          <p>
            I began my academic path in Law, where I developed a structured and analytical approach to problem-solving. My interest in technology emerged through smart contracts, which led me to explore how code can be used to define rules, automate processes, and reduce ambiguity.
          </p>
          <p>
            This curiosity pushed me into software development through a full-stack bootcamp at Le Wagon São Paulo, where I gained hands-on experience building and delivering real applications. To strengthen my technical foundation and deepen my understanding of systems, I am currently pursuing an associate’s degree in Systems Analysis and Development at FIAP.
          </p>
          <p>
            Today, I focus on building practical, well-structured software, with particular interest in backend development, system design, and long-term maintainability.
          </p>
        </div>

        {/* Right Column: The Soft Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {softSkills.map((skill) => (
            <div
              key={skill.title}
              className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 shadow-sm hover:scale-105 transition-transform duration-300"
            >
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", skill.bg, skill.color)}>
                {skill.icon}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                {skill.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
