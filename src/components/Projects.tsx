import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, ShieldCheck, Cpu, Code2, AlertTriangle, X, Compass, Radio, Check } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
  activeProjectIndex: number | null;
  onHoverProject: (index: number | null) => void;
}

export default function Projects({
  projects,
  activeProjectIndex,
  onHoverProject,
}: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Style helper based on indexes
  const getProjectSpecs = (index: number) => {
    switch (index) {
      case 0: // Compliance Checker
        return {
          accent: "text-yellow-500 border-yellow-500/20 bg-yellow-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]",
          btn: "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
          desc: "NLP ML regulatory audit analyzer representing a document wireframe.",
        };
      case 1: // SecureMind AI
        return {
          accent: "text-solara-terracotta border-solara-terracotta/20 bg-orange-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(255,111,89,0.1)]",
          btn: "bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20 text-orange-200",
          desc: "Confidentially computed mental health framework inside a secure shield capsule.",
        };
      case 2: // Hollow Socks
        return {
          accent: "text-blue-400 border-blue-500/20 bg-blue-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.1)]",
          btn: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-300",
          desc: "Custom socks performance product page flow and optimized UI layout.",
        };
      case 3: // PlumPlay UK
        return {
          accent: "text-emerald-400 border-emerald-500/20 bg-emerald-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]",
          btn: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 text-emerald-300",
          desc: "Magento performance overhaul, security upgrades, and custom checkout modules.",
        };
      case 4: // Dash into Learning
        return {
          accent: "text-purple-400 border-purple-500/20 bg-purple-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.1)]",
          btn: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-300",
          desc: "Shopify brand migration, custom Liquid theme, and optimized checkout flow.",
        };
      case 5: // Vitamin H2
        return {
          accent: "text-cyan-400 border-cyan-500/20 bg-cyan-950/10",
          glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]",
          btn: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-300",
          desc: "Clean mobile-first layout design featuring high-CRO custom catalog filtering.",
        };
      default:
        return {
          accent: "text-stone-400 border-stone-500/20 bg-stone-900/40",
          glow: "",
          btn: "bg-stone-800 text-stone-200",
          desc: "",
        };
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-12"
      >
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-amber-500"></span>
          <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">
            Technical Portfolio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          CORE PROJECTS
        </h2>
        <p className="text-slate-400 max-w-md text-sm font-light">
          Move your cursor over the project grid to engage interactive 3D HUD holograms corresponding to each core architecture.
        </p>
      </motion.div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {projects.map((proj, idx) => {
          const specs = getProjectSpecs(idx);
          const isCurrentHovered = activeProjectIndex === idx;

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onMouseEnter={() => onHoverProject(idx)}
              onMouseLeave={() => onHoverProject(null)}
              onClick={() => setSelectedProject(proj)}
              className={`cyber-glass rounded-xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${specs.accent} ${specs.glow} ${
                isCurrentHovered ? "bg-slate-900/70 border-white/20 translate-y-[-4px]" : ""
              }`}
            >
              <div className="space-y-4">
                {/* Header indicators */}
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 uppercase">{proj.date}</span>
                  <span className="text-slate-400 uppercase tracking-widest">{proj.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-extrabold text-white capitalize tracking-wide group-hover:text-cyan-400">
                  {proj.title}
                </h3>

                {/* Short visual summary explaining 3D link */}
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 border border-slate-800 text-slate-500">
                      +{proj.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* 3D Link Action indicator */}
                <div className="flex justify-between items-center text-[11px] font-mono pt-1">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Radio size={10} className={isCurrentHovered ? "animate-pulse text-amber-500" : ""} />
                    {isCurrentHovered ? "3D CAMERA TARGET ACQUIRED" : "HOVER TO PREVIEW HUD"}
                  </span>
                  <span className="flex items-center gap-1 group text-solara-amber group-hover:text-amber-400">
                    EXAMINE REPORT <ArrowRight size={12} className="ml-0.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- Detailed Report Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#080605]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl cyber-glass rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl scanlines max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800/40 p-1.5 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-solara-amber mb-2">
                    <span>{selectedProject.category}</span>
                    <span>•</span>
                    <span>{selectedProject.date}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Specs bar */}
                <div className="flex flex-wrap gap-3 pb-4 border-b border-white/5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-950/50 border border-stone-900/50 text-solara-amber text-xs font-mono">
                    <Compass size={11} /> Ready in 3D Context
                  </span>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-950/20 border border-amber-500/30 hover:bg-amber-500/40 text-amber-200 hover:text-white text-xs font-mono transition cursor-pointer"
                    >
                      <ExternalLink size={11} /> Visit Site
                    </a>
                  )}
                </div>

                {/* Section Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Cpu size={12} /> Core Summary
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Check size={12} className="text-amber-500" /> Highlights & Achievements
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm font-light">
                        {selectedProject.highlights.map((highlight, hIdx) => (
                          <li key={hIdx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Code2 size={12} /> Tech Stack & Modules
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-amber-950/10 border border-amber-500/20 text-amber-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Conceptual architecture diagrams */}
                  {selectedProject.architectureSteps && selectedProject.architectureSteps.length > 0 && (
                    <div className="pt-4 mt-2 p-4 rounded-xl bg-[#080605] border border-stone-900 space-y-3 font-mono text-[11px] sm:text-xs">
                      <div className="text-slate-400 uppercase font-semibold text-xs border-b border-stone-900 pb-1.5 flex items-center gap-1">
                        <ShieldCheck size={12} className="text-amber-500" /> SYSTEM ARCHITECTURE PATTERNS
                      </div>
                      <div className="space-y-1.5 text-slate-300">
                        {selectedProject.architectureSteps.map((step, idx) => {
                          const parts = step.split(/(\[[^\]]+\])/g);
                          return (
                            <div key={idx}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith("[") && part.endsWith("]")) {
                                  return (
                                    <span key={pIdx} className="text-solara-amber">
                                      {part}
                                    </span>
                                  );
                                }
                                return part;
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Close modal banner */}
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white text-xs font-mono hover:bg-white/10 transition cursor-pointer"
                  >
                    CLOSE PORTAL REPORT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

