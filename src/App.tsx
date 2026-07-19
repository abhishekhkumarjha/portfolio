import { useState, useEffect, useRef } from "react";
import { Cpu, Terminal, ShieldAlert, Award, FileText, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { resumeData } from "./data/resume";
import ThreeCanvas from "./components/ThreeCanvas";
import Hero from "./components/Hero";
import ExperienceSection from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import CertificationsAndContact from "./components/CertificationsAndContact";

export default function App() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // References to section containers to facilitate click-to-scroll navigation
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const sectionLabels = ["Intro", "Experience", "Projects", "Skills", "Credentials"];
  const sectionIcons = [
    <Cpu size={14} key="intro" />,
    <FileText size={14} key="exp" />,
    <ShieldAlert size={14} key="proj" />,
    <Award size={14} key="skills" />,
    <Terminal size={14} key="cert" />,
  ];

  // Calculate current overall scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = (scrollTop / docHeight) * 100;
        setScrollPercent(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use IntersectionObserver to seamlessly set active section index during interactive scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // triggers when section dominates central 50% viewport
      threshold: 0.15,
    };

    const observers = sectionRefs.map((ref, idx) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(idx);
          }
        });
      }, observerOptions);

      observer.observe(ref.current);
      return { observer, element: ref.current };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const scrollToSection = (idx: number) => {
    setMenuOpen(false);
    sectionRefs[idx].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#080605] overflow-hidden select-none">
      {/* --- React-3D Canvas Render Layer (Stays fixed in background) --- */}
      <ThreeCanvas
        activeSection={activeSection}
        scrollPercent={scrollPercent}
        activeProjectIndex={activeProjectIndex}
      />

      {/* --- Global Decorative Grid Borders (Anti-slop clean tech line guides) --- */}
      <div className="fixed inset-y-0 left-6 md:left-12 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="fixed inset-y-0 right-6 md:right-12 w-[1px] bg-white/5 pointer-events-none z-10" />

      {/* --- Dynamic Global Header Bar --- */}
      <header className="fixed top-0 inset-x-0 h-16 border-b border-white/5 bg-[#080605]/70 backdrop-blur-md z-40 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection(0)}
            className="h-8 w-8 rounded bg-amber-950/20 border border-amber-500/20 text-solara-amber font-mono text-sm tracking-tight flex items-center justify-center font-bold font-display cursor-pointer"
          >
            A
          </button>
          <div className="hidden sm:block">
            <span className="text-xs font-mono text-stone-500 uppercase">SYS_NODE //</span>{" "}
            <span className="text-xs font-mono text-solara-amber font-semibold">{resumeData.name}</span>
          </div>
        </div>

        {/* Global Action Banner & Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          {sectionLabels.map((label, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className={`hover:text-solara-amber cursor-pointer transition uppercase tracking-wider ${
                activeSection === idx ? "text-solara-amber font-bold" : "text-stone-400"
              }`}
            >
              {label}
            </button>
          ))}
          <span className="h-4 w-[1px] bg-white/5" />
          <a
            href={`mailto:${resumeData.email.join(",")}`}
            className="px-3 py-1 rounded bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/20 text-amber-200 hover:text-white transition uppercase text-[10px]"
          >
            DISPATCH_MAIL
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`mailto:${resumeData.email.join(",")}`}
            className="p-1.5 px-2 rounded bg-amber-950/20 text-amber-200 border border-amber-500/20 text-[10px] uppercase font-mono"
          >
            Mail
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 px-1.5 rounded border border-white/5 bg-stone-900/60 text-stone-400 hover:text-white cursor-pointer"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* --- Mobile Full-Screen Dropdown Overlay (Clean Minimalist styling) --- */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-30 pt-16 bg-[#080605]/98 backdrop-blur-xl flex flex-col justify-center items-center p-8 border-b border-white/5 md:hidden">
            <div className="space-y-6 text-center">
              {sectionLabels.map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className={`block text-xl uppercase font-display font-extrabold tracking-widest cursor-pointer hover:text-solara-amber ${
                    activeSection === idx ? "text-solara-amber" : "text-stone-300"
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="h-[1px] w-12 bg-white/10 mx-auto my-6" />

              <div className="flex justify-center gap-4 text-xs font-mono text-stone-500 pb-2">
                <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="hover:text-solara-amber">Linkedin</a>
                {resumeData.github && (
                  <>
                    <span>•</span>
                    <a href={resumeData.github} target="_blank" rel="noreferrer" className="hover:text-solara-amber">Github</a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Vertical Scroll Progress Bar (Right hand track) --- */}
      <div className="fixed right-6 md:right-12 bottom-24 top-24 w-[1px] bg-white/5 hidden sm:block pointer-events-none z-10">
        <div
          className="w-[1px] bg-gradient-to-b from-solara-terracotta to-solara-amber absolute top-0"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      {/* --- Floating Dot navigation (Left side dock) --- */}
      <div className="fixed left-2 md:left-4 top-1/2 transform -translate-y-1/2 flex-col gap-3 hidden sm:flex z-20">
        {sectionLabels.map((label, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="group flex items-center gap-2 cursor-pointer outline-none justify-start pl-1 text-[11px]"
            title={`Go to ${label}`}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 border ${
                  activeSection === idx
                    ? "bg-solara-amber border-solara-amber scale-120 animate-[pulse_1.5s_infinite_ease-in-out]"
                    : "bg-transparent border-stone-800 group-hover:border-stone-500"
                }`}
              />
            </div>
            <span
              className={`font-mono text-[9px] uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none ${
                activeSection === idx ? "text-solara-amber font-semibold opacity-60 translate-x-0" : "text-stone-600"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* --- Main Contents Scrolling Column Overlaid on Canvas --- */}
      <main className="relative z-15 w-full">
        {/* Intro Hero Section */}
        <div ref={sectionRefs[0]} id="section-0" className="w-full">
          <Hero data={resumeData} onScrollToNext={() => scrollToSection(1)} />
        </div>

        {/* Experience Section */}
        <div ref={sectionRefs[1]} id="section-1" className="w-full">
          <ExperienceSection experienceList={resumeData.experience} />
        </div>

        {/* Technical Projects Section */}
        <div ref={sectionRefs[2]} id="section-2" className="w-full">
          <Projects
            projects={resumeData.projects}
            activeProjectIndex={activeProjectIndex}
            onHoverProject={setActiveProjectIndex}
          />
        </div>

        {/* Skills Section */}
        <div ref={sectionRefs[3]} id="section-3" className="w-full">
          <Skills skills={resumeData.skills} />
        </div>

        {/* Certifications and Contact Console */}
        <div ref={sectionRefs[4]} id="section-4" className="w-full">
          <CertificationsAndContact data={resumeData} />
        </div>
      </main>

      {/* --- Dynamic HUD Status Footer (Bottom Margins) --- */}
      <footer className="fixed bottom-0 inset-x-0 h-10 border-t border-white/5 bg-[#080605]/80 backdrop-blur-md z-35 flex items-center justify-between px-6 md:px-12 text-[10px] font-mono text-stone-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>RENDERER: THREE.JS GL_PIPELINE</span>
        </div>
        <div className="hidden sm:block">
          <span>COORDS: X={scrollPercent.toFixed(1)}% Y=LINEAR_LERP</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} ABHISHEKH_JHA</span>
        </div>
      </footer>
    </div>
  );
}
