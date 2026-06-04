import { motion } from "motion/react";
import { Mail, Github, Linkedin, Clipboard, Check, Phone, Shield, Cpu, Cloud, MapPin } from "lucide-react";
import { useState } from "react";
import { ResumeData } from "../types";

interface HeroProps {
  data: ResumeData;
  onScrollToNext: () => void;
}

export default function Hero({ data, onScrollToNext }: HeroProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 max-w-5xl mx-auto z-10 relative">
      <div></div> {/* spacer */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Intro details */}
        <div className="md:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-amber-500/55"></span>
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">
                Systems & Automation Portfolio
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
              {data.name}
            </h1>
            <p className="text-xl sm:text-2xl font-display font-medium text-solara-amber">
              {data.title}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-300 leading-relaxed max-w-lg text-sm sm:text-base font-light"
          >
            {data.summary}
          </motion.p>

          {/* Quick Stats Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 max-w-md pt-2"
          >
            <div className="cyber-glass p-3 rounded-lg border border-amber-500/10 text-center">
              <div className="text-solara-amber font-mono text-lg font-bold">2X</div>
              <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">Cloud Certified</div>
            </div>
            <div className="cyber-glass p-3 rounded-lg border border-orange-500/10 text-center">
              <div className="text-solara-terracotta font-mono text-lg font-bold">4</div>
              <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">AI/Cyber Projects</div>
            </div>
            <div className="cyber-glass p-3 rounded-lg border border-yellow-600/10 text-center">
              <div className="text-yellow-500 font-mono text-lg font-bold">CSE</div>
              <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">Student Engineer</div>
            </div>
          </motion.div>

          {/* Contacts & Social Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3 pt-4"
          >
            <a
              href={data.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-950/20 hover:bg-amber-950/30 border border-amber-500/20 text-solara-amber text-xs transition duration-200 font-mono"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs transition duration-200 font-mono"
            >
              <Github size={14} />
              GitHub
            </a>
            
            {/* Click to copy email */}
            <button
              onClick={() => copyToClipboard(data.email, "email")}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/50 text-slate-200 text-xs transition duration-200 font-mono relative cursor-pointer"
            >
              <Mail size={14} />
              <span className="max-w-[150px] truncate">{data.email}</span>
              {copiedText === "email" ? (
                <Check size={12} className="text-emerald-400 ml-1" />
              ) : (
                <Clipboard size={12} className="text-slate-500 hover:text-slate-300 ml-1" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Right side: Credentials HUD list */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="md:col-span-5 cyber-glass p-5 rounded-xl border border-white/5 space-y-4 shadow-xl scanlines"
        >
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-xs font-mono text-solara-amber flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu size={12} /> SYSTEM_INFO.LOG
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          </div>

          <div className="space-y-3.5 font-mono text-xs">
            <div className="space-y-1">
              <div className="text-stone-500 uppercase tracking-tight">Status</div>
              <div className="text-stone-300 flex items-center gap-1">
                <span>Oracle & MongoDB Certified Professional</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-stone-500 uppercase tracking-tight">Focus Domains</div>
              <div className="text-yellow-400/90 leading-relaxed">
                Full-Stack, AI Automation, Cyber Defense
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-stone-500 uppercase tracking-tight">Primary Tech</div>
              <div className="text-orange-300/95">
                Java (SE 17), Python, React.js, Node.js
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-stone-500 uppercase tracking-tight">Contacts</div>
              <div className="text-stone-300 space-y-1">
                {data.phone.map((phoneNum, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Phone size={10} className="text-amber-500" />
                    <span>{phoneNum}</span>
                    <button
                      onClick={() => copyToClipboard(phoneNum, `phone-${i}`)}
                      className="text-[10px] text-stone-500 hover:text-white"
                    >
                      {copiedText === `phone-${i}` ? <Check size={8} /> : <Clipboard size={8} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/30 border border-amber-500/20 text-[10px] text-solara-amber">
                <MapPin size={10} /> SRM University AP
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        onClick={onScrollToNext}
        className="flex flex-col items-center justify-center cursor-pointer mt-12 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
          Scroll or click to Explore core files
        </span>
        <svg
          className="w-4 h-4 text-solara-amber"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
}
