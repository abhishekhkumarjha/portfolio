import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal as TermIcon, Check, Copy, Send, Award, Trophy, ExternalLink, ShieldCheck, Phone, Mail, Linkedin, Github } from "lucide-react";
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
      output: "INITIALIZING ABHISHEKH_JHA SECURE SYSTEM CONSOLE.\nType 'help' for available host commands.\nNode Ready.",
    },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

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
        output = `Available system Commands:\n  about          - Displays candidate executive profile.\n  skills         - Lists verified technical competencies.\n  projects       - Displays the 4 technical architectures and GitHub repositories.\n  certificates   - Prints verified certifications & credential links.\n  hackathons     - Lists competitive hackathons and achievements.\n  contact        - Outputs verified communication endpoints.\n  clear          - Resets terminal screen.`;
        break;
      case "about":
        output = `Host: ${data.name}\nTitle: ${data.title}\nStatus: Oracle & MongoDB Certified | Cloudinntech AI/ML Intern\nSummary: ${data.summary}`;
        break;
      case "skills":
        output = `LANGUAGES: Java (SE 17), Python, C/C++, JS, PHP, Prolog\nFRAMEWORKS: Node.js, React.js, Flask, Flutter, Bootstrap\nDATABASES: MongoDB, MySQL, SQLite\nCORE DOMAINS: Artificial Intelligence (AI), NLP, Machine Learning (ML), Cyber Defense\nCLOUD & TOOLS: AWS, Salesforce, Git, GitHub, Figma`;
        break;
      case "projects":
        output = data.projects.map(p => `• [${p.category}] ${p.title} (${p.date})\n  ${p.description}\n  GitHub: ${p.github || "N/A"}`).join("\n\n");
        break;
      case "certificates":
        output = `1. CERTIFICATE OF INTERNSHIP IN CYBERSECURITY | Cloudinntech | Jun 2026\n2. ORACLE CERTIFIED PROFESSIONAL (Java SE 17) | Mar 2026\n3. MONGODB CERTIFIED ASSOCIATE DEVELOPER | May 2026 (credly.com/go/FZUSnFxI)\n4. INFOSYS SPRINGBOARD CERTIFICATION | Jun 2026 (verify.onwingspan.com)\n5. SALESFORCE DEVELOPER CHAMPION | Aug 2025`;
        break;
      case "hackathons":
        output = `HACKATHONS & EVENTS:\n1. JPD Hub Hackathon (Advitiya'26) Participant\n2. Eonverse (Team X-CUTION) | Odoo 24h Comp.`;
        break;
      case "contact":
        output = `Emails:\n  ${data.email.join("\n  ")}\nPhones:\n  ${data.phone.join("\n  ")}\nLinkedIn: ${data.linkedin}\nGitHub: ${data.github}`;
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
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col justify-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-14"
      >
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-amber-500"></span>
          <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">
            Credentials & Comms
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          CERTIFICATIONS, AWARDS & CONTACT
        </h2>
        <p className="text-slate-400 max-w-lg text-sm font-light">
          Verified industry credentials, competitive hackathon events, and interactive diagnostics console.
        </p>
      </motion.div>

      {/* --- Section 1: Certifications & Events Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Industry Certifications & Awards (7 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 cyber-glass rounded-xl p-5 border border-amber-500/20 bg-amber-950/10 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/10">
            <h3 className="text-sm font-display font-bold text-white uppercase flex items-center gap-2">
              <Award className="text-amber-400" size={16} /> Certifications & Awards
            </h3>
            <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              OFFICIAL CREDENTIALS
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {data.certifications?.map((cert, idx) => (
              <div key={idx} className="space-y-1 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-amber-500/30 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-slate-200 font-semibold leading-snug">{cert.name}</span>
                  </div>
                  <div className="text-[11px] text-amber-400/90 pt-0.5">{cert.authority}</div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">{cert.date}</span>
                  {cert.credLink && (
                    <a
                      href={cert.credLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-solara-amber hover:underline font-semibold"
                    >
                      <ExternalLink size={9} /> Verify
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hackathons & Events (5 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="md:col-span-5 cyber-glass rounded-xl p-5 border border-cyan-500/20 bg-cyan-950/10 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/10">
            <h3 className="text-sm font-display font-bold text-white uppercase flex items-center gap-2">
              <Trophy className="text-cyan-400" size={16} /> Hackathons & Events
            </h3>
            <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              COMPETITIVE
            </span>
          </div>
          <div className="space-y-3 text-xs font-mono">
            {data.events?.hackathons.map((hack, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-slate-200 font-semibold leading-snug">{hack.title}</div>
                {hack.organizerOrRole && (
                  <div className="text-[11px] text-cyan-300 font-mono">{hack.organizerOrRole}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- Section 2: Contact Methods & Terminal Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-start">
        {/* Left column: Direct Contact & Comms links */}
        <div className="md:col-span-5 space-y-6">
          <div className="cyber-glass p-5 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-mono text-solara-amber uppercase font-semibold flex items-center gap-1.5">
                <ShieldCheck size={13} /> Direct Communication Channels
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Email addresses */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-stone-400 uppercase">Email Endpoints</div>
              {data.email.map((emailStr, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={() => copyText(emailStr, `email-copy-${idx}`)}
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate max-w-[210px]">{emailStr}</span>
                    {copiedLabel === `email-copy-${idx}` ? (
                      <Check size={12} className="text-emerald-400 ml-1.5" />
                    ) : (
                      <Copy size={12} className="text-stone-500 ml-1.5" />
                    )}
                  </button>
                  <a
                    href={`mailto:${emailStr}`}
                    className="px-3 py-2 rounded-lg bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/20 text-solara-amber text-xs font-mono flex items-center justify-center gap-1 transition cursor-pointer"
                    title={`Send email to ${emailStr}`}
                  >
                    <Send size={12} />
                    <span>Send</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Phone numbers */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-mono text-stone-400 uppercase">Telephone Links</div>
              {data.phone.map((phoneNum, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(phoneNum, `phone-copy-${idx}`)}
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} className="text-amber-500" />
                      {phoneNum}
                    </span>
                    {copiedLabel === `phone-copy-${idx}` ? (
                      <Check size={12} className="text-emerald-400 ml-1.5" />
                    ) : (
                      <Copy size={12} className="text-stone-500 ml-1.5" />
                    )}
                  </button>
                  <a
                    href={`tel:${phoneNum}`}
                    className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-slate-300 text-xs font-mono flex items-center justify-center transition cursor-pointer"
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-amber-950/20 hover:bg-amber-950/30 border border-amber-500/20 text-solara-amber text-xs font-mono flex items-center justify-center gap-1.5 transition"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs font-mono flex items-center justify-center gap-1.5 transition"
                >
                  <Github size={13} /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Interactive simulated terminal diagnostics log */}
        <div className="md:col-span-7 space-y-6">
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
            </div>

            {/* Terminal Screen details */}
            <div className="h-[280px] bg-black/40 p-4 font-mono text-xs text-stone-300 overflow-y-auto space-y-3.5 leading-relaxed no-scrollbar select-text">
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
                className="p-1 px-2.5 rounded bg-amber-950/20 text-solara-amber border border-amber-500/20 text-[10px] font-mono cursor-pointer hover:bg-amber-950/40 transition"
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
