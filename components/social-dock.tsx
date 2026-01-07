"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SocialDock() {
  const socialLinks = [
    {
      icon: <Linkedin size={36} />,
      href: "https://www.linkedin.com/in/guilhermednunes/",
      label: "LinkedIn",
      glowColor: "rgba(0,119,181,0.6)",
      hoverColor: "#0077b5",
    },
    {
      icon: <Github size={36} />,
      href: "https://github.com/guidonunes",
      label: "GitHub",
      glowColor: "rgba(255,255,255,0.6)",
      hoverColor: "white",
    },
    {
      icon: <Mail size={36} />,
      href: "mailto:guilherme.augd@gmail.com",
      label: "Email",
      glowColor: "rgba(34,211,238,0.6)",
      hoverColor: "#22d3ee",
    },
    {
      icon: <FileText size={36} />,
      href: "/resume.pdf",
      label: "Resume",
      glowColor: "rgba(192,132,252,0.6)",
      hoverColor: "#c084fc",
    },
  ];

  return (
    <div className="flex items-center gap-8">
      {socialLinks.map((link) => (
        <motion.div
          key={link.label}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-slate-400 transition-all duration-300"
            style={{
              color: "rgb(148 163 184)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = link.hoverColor;
              e.currentTarget.style.filter = `drop-shadow(0 0 15px ${link.glowColor})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgb(148 163 184)";
              e.currentTarget.style.filter = "drop-shadow(0 0 0px transparent)";
            }}
          >
            {link.icon}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
