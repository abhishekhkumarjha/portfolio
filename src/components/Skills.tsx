import { motion } from "motion/react";
import { Cpu, Code2, Database, ShieldAlert, CloudLightning, ShieldCheck, Award } from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  // Map icons to the categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return <Code2 className="text-yellow-500" size={18} />;
      case "frameworks & libraries":
        return <Cpu className="text-orange-400" size={18} />;
      case "databases":
        return <Database className="text-solara-amber" size={18} />;
      case "core domains":
        return <ShieldAlert className="text-solara-terracotta" size={18} />;
      default:
        return <CloudLightning className="text-amber-500" size={18} />;
    }
  };

  // Get custom bar styling & fake but representative skill strength based on CV profile
  const getSkillStrength = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("java")) return { pct: "95%", desc: "Advanced systems architecture & JVM engineering" };
    if (name.includes("python")) return { pct: "90%", desc: "Surgical robotic optimization & NLP" };
    if (name.includes("mongodb")) return { pct: "90%", desc: "NoSQL database optimization & indexing" };
    if (name.includes("react")) return { pct: "85%", desc: "Interactive modern full-stack UI" };
    if (name.includes("cyber")) return { pct: "85%", desc: "Antigena simulation & defensive logic" };
    if (name.includes("artificial") || name.includes("nlp") || name.includes("machine")) return { pct: "90%", desc: "Regulatory checker ML models" };
    if (name.includes("aws")) return { pct: "80%", desc: "Fault-tolerant Beanstalk networks" };
    if (name.includes("salesforce")) return { pct: "85%", desc: "Developer Champion & LWC Superbadges" };
    if (name.includes("c/c++") || name.includes("javascript") || name.includes("node")) return { pct: "85%", desc: "Advanced engineering projects" };
    return { pct: "75%", desc: "Advanced academic coursework" };
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
          CORE COMPETENCIES
        </h2>
        <p className="text-slate-400 max-w-md text-sm font-light">
          A granular list of core technical competencies cross-referenced with active projects and enterprise fields.
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
            className={`cyber-glass rounded-xl p-6 border border-white/5 space-y-4 shadow-lg hover:border-amber-500/10 hover:shadow-amber-500/5 duration-300 transition ${
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
                Module {idx + 1}
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

                    {/* Explanatory subtitle linking back to portfolio / credentials */}
                    <p className="text-[10px] text-slate-500 leading-tight block group-hover:text-slate-400 transition-colors">
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
