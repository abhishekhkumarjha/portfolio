import { motion } from "motion/react";
import { Cpu, Code2, Database, ShieldAlert, CloudLightning, Wrench } from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return <Code2 className="text-yellow-500" size={18} />;
      case "frameworks/libs":
      case "frameworks & libraries":
        return <Cpu className="text-orange-400" size={18} />;
      case "databases":
        return <Database className="text-solara-amber" size={18} />;
      case "core domains":
        return <ShieldAlert className="text-solara-terracotta" size={18} />;
      case "cloud & tools":
        return <Wrench className="text-amber-500" size={18} />;
      default:
        return <CloudLightning className="text-amber-500" size={18} />;
    }
  };

  const getSkillStrength = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("java")) return { pct: "95%", desc: "Oracle Certified Professional (Java SE 17) & enterprise systems" };
    if (name.includes("python")) return { pct: "94%", desc: "AI/ML models, NLP workflows & surgical robotic tracking" };
    if (name.includes("mongodb")) return { pct: "92%", desc: "MongoDB Certified Associate Developer (Credly verified)" };
    if (name.includes("artificial intelligence") || name.includes("(ai)")) return { pct: "92%", desc: "AI-driven features & automated risk-mitigation platforms" };
    if (name.includes("nlp")) return { pct: "90%", desc: "Semantic contract parsing & clause extraction models" };
    if (name.includes("machine learning") || name.includes("(ml)")) return { pct: "90%", desc: "Predictive model optimization & regulatory audits" };
    if (name.includes("cyber defense")) return { pct: "92%", desc: "Autonomous threat response simulation & network traffic monitoring" };
    if (name.includes("aws")) return { pct: "88%", desc: "Fault-tolerant architecture using AWS Elastic Beanstalk" };
    if (name.includes("salesforce")) return { pct: "88%", desc: "Salesforce Developer Champion | Apex & LWC Superbadges" };
    if (name.includes("react")) return { pct: "90%", desc: "Interactive dynamic web frontends & 3D visualization" };
    if (name.includes("node")) return { pct: "88%", desc: "High-performance event-driven REST APIs & services" };
    if (name.includes("flask")) return { pct: "86%", desc: "Lightweight Python microservices for AI model deployment" };
    if (name.includes("flutter")) return { pct: "82%", desc: "Cross-platform mobile application development" };
    if (name.includes("c/c++")) return { pct: "85%", desc: "Core algorithms, data structures & system foundations" };
    if (name.includes("mysql") || name.includes("sqlite")) return { pct: "88%", desc: "Relational database schema modeling & optimization" };
    if (name.includes("git")) return { pct: "90%", desc: "Git/GitHub version control & cross-functional workflows" };
    if (name.includes("figma")) return { pct: "85%", desc: "UI/UX component blueprints & interactive wireframing" };
    if (name.includes("php")) return { pct: "82%", desc: "Server-side web scripting & database interfacing" };
    if (name.includes("prolog")) return { pct: "80%", desc: "Logic programming & declarative inference systems" };
    return { pct: "85%", desc: "Enterprise software engineering practices" };
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
          <span className="h-[1px] w-8 bg-amber-500"></span>
          <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">
            Engineering Matrix
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          TECHNICAL SKILLS
        </h2>
        <p className="text-slate-400 max-w-md text-sm font-light">
          Core technical competencies, programming languages, and toolsets aligned with industry certifications and practical experience.
        </p>
      </motion.div>

      {/* Grid of skill blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {skills.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={`cyber-glass rounded-xl p-6 border border-white/5 space-y-4 shadow-lg hover:border-amber-500/15 hover:shadow-amber-500/5 duration-300 transition ${
              idx === skills.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            {/* Category Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-md font-display font-extrabold text-white uppercase flex items-center gap-2">
                {getCategoryIcon(category.category)}
                {category.category}
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Module 0{idx + 1}
              </span>
            </div>

            {/* List of items within category */}
            <div className="space-y-4 pt-2">
              {category.items.map((item, idy) => {
                const strength = getSkillStrength(item);

                return (
                  <div key={idy} className="group space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-semibold">{item}</span>
                      <span className="text-amber-400">{strength.pct}</span>
                    </div>

                    {/* Glowing strength bar */}
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: strength.pct }}
                        viewport={{ once: true }}
                        transition={{ delay: idy * 0.05 + 0.1, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full group-hover:from-orange-500 group-hover:to-yellow-500 transition-colors duration-300"
                      />
                    </div>

                    {/* Explanatory subtitle */}
                    <p className="text-[10px] text-slate-500 leading-tight block group-hover:text-slate-400 transition-colors font-mono">
                      {strength.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
