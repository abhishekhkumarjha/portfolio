import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Award, Terminal as TermIcon, ShieldAlert, Check, Copy, Send, ExternalLink } from "lucide-react";
import { ResumeData } from "../types";

interface CertContactProps {
  data: ResumeData;
}

export default function CertificationsAndContact({ data }: CertContactProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  
  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "systeminit",
      output: "WELCOME TO THE ABHISHEKH_JHA INTERACTIVE DIAGNOSTICS CONSOLE.\nType 'help' for a list of available host commands.\nReady.",
    },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  // Auto scroll terminal
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let output = "";
    switch (command) {
      case "help":
        output = `Available system Commands:\n  about          - Displays short executive summary.\n  skills         - Lists verified engineering competencies.\n  projects       - Lists core architectural systems built by host.\n  certificates   - Prints license key codes and certification links.\n  clear          - Resets the terminal screen back home.`;
        break;
      case "about":
        output = `Host: ${data.name}\nTitle: ${data.title}\nStatus: Oracle & MongoDB Certified\nLocation: India\nSummary: ${data.summary}`;
        break;
      case "skills":
        output = `LANGUAGES: Java (SE 17), Python, C/C++, JS, PHP\nDATABASES: MongoDB Certified Developer, MySQL, SQLite\nDOMAINS: AI systems, NLP, Cyber Defense, AWS infrastructure`;
        break;
      case "projects":
        output = data.projects.map(p => `• [${p.category}] ${p.title} (${p.date})`).join("\n");
        break;
      case "certificates":
        output = `1. ORACLE CERTIFIED PROFESSIONAL (Java SE 17) - Valid Mar 2026\n2. MONGODB CERTIFIED ASSOCIATE DEVELOPER - Valid May 2026\n3. SALESFORCE DEVELOPER CHAMPION - Aug 2025`;
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = `Command not recognized: '${command}'. Type 'help' to review directory controls.`;
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput("");
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-16"
      >
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-orange-500"></span>
          <span className="text-xs font-mono tracking-[0.25em] text-solara-terracotta uppercase">
            Credentials & Core
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          VERIFICATIONS & TERMINAL
        </h2>
        <p className="text-slate-400 max-w-md text-sm font-light">
          Verify licensed credentials or query the local interactive system diagnostics console directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-start">
        {/* Left column: Certifications & Awards */}
        <div className="md:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-mono uppercase text-[#e7e5e4] tracking-wider flex items-center gap-2">
              <Award size={16} className="text-solara-terracotta" /> Licensed Credentials
            </h3>

            {/* Cert Cards */}
            <div className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="cyber-glass rounded-xl p-4 border border-orange-500/10 hover:border-orange-500/30 transition duration-300">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-display font-extrabold text-white">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] font-mono text-stone-500 uppercase">
                        Issued by {cert.authority} | {cert.date}
                      </p>
                    </div>
                    {cert.credLink && (
                      <a
                        href={cert.credLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-solara-terracotta hover:text-white transition duration-200"
                        title="Verify Credential Link"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hackathons / Events */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-3 pt-2"
          >
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <ShieldAlert size={14} className="text-amber-500" /> Hackathons & Events
            </h4>
            <div className="space-y-2">
              {data.awards.map((award, aIdx) => (
                <div key={aIdx} className="p-3 rounded-lg bg-stone-900/40 border border-stone-800/80 text-xs text-stone-300 font-mono flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core file contacts download banner */}
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => copyText(data.email, "email-copy")}
              className="px-4 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer relative"
            >
              <Copy size={12} />
              <span>Email Contact</span>
              {copiedLabel === "email-copy" && <Check size={12} className="text-emerald-400 ml-1.5" />}
            </button>
            <a
              href="mailto:avishekhjhaaj@gmail.com"
              className="px-4 py-2 rounded-lg bg-orange-950/10 hover:bg-orange-950/20 border border-orange-500/20 text-solara-terracotta text-xs font-mono flex items-center gap-1.5 transition"
            >
              <Send size={12} />
              <span>Direct Link</span>
            </a>
          </div>
        </div>

        {/* Right column: Interactive simulated terminal diagnostics log */}
        <div className="md:col-span-7 space-y-6">
          {/* SSH diagnostics container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cyber-glass rounded-xl border border-white/5 shadow-2xl overflow-hidden"
          >
            {/* Terminal Top header bar */}
            <div className="bg-slate-950/90 border-b border-white/5 px-4 py-2 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2">
                <TermIcon size={12} className="text-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-bold uppercase tracking-tight">Diagnostics SSH Terminal</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/50"></span>
                <span className="h-2 w-2 rounded-full bg-yellow-500/50"></span>
                <span className="h-2 w-2 rounded-full bg-green-500/50"></span>
              </div>
            </div>            {/* Terminal Screen details */}
            <div className="h-[240px] bg-black/40 p-4 font-mono text-xs text-stone-300 overflow-y-auto space-y-3.5 leading-relaxed no-scrollbar select-text">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-solara-amber">
                    <span>guest@abhishekh_jha:~#</span>
                    <span className="text-white font-medium">{item.command}</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-stone-300 text-[11px] font-sans tracking-tight">
                    {item.output}
                  </pre>
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal Command input form */}
            <form onSubmit={handleTerminalSubmit} className="bg-[#0c0a09]/90 border-t border-white/5 p-2 flex items-center gap-2">
              <span className="font-mono text-xs text-solara-amber pl-2">guest@abhishekh_jha:~#</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type help and press enter..."
                className="flex-1 bg-transparent border-0 ring-0 outline-none text-xs font-mono text-yellow-500 placeholder:text-stone-700 focus:ring-0"
              />
              <button
                type="submit"
                className="p-1 px-2.5 rounded bg-amber-950/20 text-solara-amber border border-amber-500/20 text-[10px] font-mono cursor-pointer"
              >
                EXECUTE
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
