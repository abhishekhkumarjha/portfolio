import { motion } from "motion/react";
import { Briefcase, Calendar, Award, Network } from "lucide-react";
import { Experience } from "../types";

interface ExperienceProps {
  experienceList: Experience[];
}

export default function ExperienceSection({ experienceList }: ExperienceProps) {
  // Let's map custom colors or tags to specific companies for high-contrast branding
  const getBrandDetails = (company: string) => {
    if (company.includes("Infosys")) {
      return {
        color: "border-amber-500/20 text-solara-amber bg-amber-950/10",
        pill: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        glow: "shadow-[0_0_15px_rgba(229,186,115,0.08)]",
      };
    } else if (company.includes("Salesforce") || company.includes("SmartBridge")) {
      return {
        color: "border-orange-500/20 text-solara-terracotta bg-orange-950/10",
        pill: "bg-orange-500/10 text-orange-300 border-orange-500/20",
        glow: "shadow-[0_0_15px_rgba(255,111,89,0.08)]",
      };
    } else {
      return {
        color: "border-yellow-600/20 text-yellow-500 bg-yellow-950/10",
        pill: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
        glow: "shadow-[0_0_15px_rgba(202,138,4,0.08)]",
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
        className="space-y-2 mb-16"
      >
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-amber-500"></span>
          <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">
            Professional Track
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          PRACTICAL EXPERIENCE
        </h2>
        <p className="text-slate-400 max-w-md text-sm font-light">
          Practical training, internships, and simulation programs modeling enterprise architecture standards.
        </p>
      </motion.div>

      {/* Timeline list */}
      <div className="relative pl-6 md:pl-8 border-l border-slate-800/80 space-y-12">
        {experienceList.map((exp, idx) => {
          const brand = getBrandDetails(exp.company);

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative"
            >
              {/* Timeline dot node */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#080605] border-2 border-stone-800 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 active-glow"></div>
                </div>
              </div>

              {/* Main Card */}
              <div className={`cyber-glass p-6 rounded-xl border ${brand.color} ${brand.glow} hover:bg-slate-900/40 transition duration-300 space-y-4`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-white tracking-wide">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="h-3 w-[1px] bg-slate-800"></span>
                      <span className="text-xs font-mono text-slate-500">{exp.location}</span>
                    </div>
                  </div>

                  {/* Metadata pills */}
                  <div className="flex flex-wrap gap-2 pt-1 md:pt-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-400">
                      <Calendar size={10} />
                      {exp.period}
                    </span>
                    {exp.company.includes("Salesforce") && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-950/40 border border-blue-500/20 text-blue-200">
                        <Award size={10} />
                        Superbadges
                      </span>
                    )}
                    {exp.company.includes("MedTech") && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-950/40 border border-purple-500/20 text-purple-200">
                        <Network size={10} />
                        Python & AWS
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets List */}
                <ul className="space-y-2 pl-4 list-disc text-sm text-slate-300 leading-relaxed font-light">
                  {exp.bullets.map((bullet, bulkIdx) => (
                    <li key={bulkIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
