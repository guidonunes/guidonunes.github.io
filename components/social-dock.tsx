import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SocialDock() {
  const socialLinks = [
    {
      icon: <Linkedin size={36} />,
      href: "https://www.linkedin.com/in/guilhermednunes/", // Update this!
      label: "LinkedIn",
      // Hover: LinkedIn Blue + Blue Glow
      className: "hover:text-[#0077b5] hover:drop-shadow-[0_0_15px_rgba(0,119,181,0.6)]",
    },
    {
      icon: <Github size={36} />,
      href: "https://github.com/guidonunes",
      label: "GitHub",
      // Hover: White + White Glow
      className: "hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]",
    },
    {
      icon: <Mail size={36} />,
      href: "mailto:guilherme.augd@gmail.com", // Update this!
      label: "Email",
      // Hover: Cyan + Cyan Glow
      className: "hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]",
    },
    // Optional: Resume Link
     {
       icon: <FileText size={36} />,
       href: "/resume.pdf",
       label: "Resume",
       className: "hover:text-purple-400 hover:drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]",
    },
  ];

  return (
    <div className="flex items-center gap-8">
      {socialLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={cn(
            // Base Styles
            "text-slate-400 transition-all duration-300",
            // Animation: Lift up slightly (-translate-y-1) and scale up
            "hover:-translate-y-1 hover:scale-110",
            link.className
          )}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
