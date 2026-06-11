"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, animate, useInView, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";
import Typewriter from 'typewriter-effect';

// --- TYPES ---
interface MagneticProps { children: ReactNode; distance?: number; }
interface CounterProps { value: number; suffix?: string; }
interface Skill { name: string; level: string; icon: string; }

// --- ICONS ---
const Icons = {
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  ArrowUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
  ),
};

// Magnetic only on non-touch / capable devices
const Magnetic = ({ children, distance = 0.4 }: MagneticProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const shouldReduce = useReducedMotion();
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    setIsFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (shouldReduce || !isFine) return <>{children}</>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) * distance);
    mouseY.set((clientY - top - height / 2) * distance);
  };
  const reset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={reset} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
};

const Counter = ({ value, suffix = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (shouldReduce) { setCount(value); return; }
      const controls = animate(0, value, {
        duration: 1.8,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [inView, value, shouldReduce]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const skills: Skill[] = [
  { name: "Python", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", level: "Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Next.js", level: "Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "SQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "AWS", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Java", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Streamlit", level: "Advanced", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "Pandas", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "OpenCV", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
];

const ProjectCard = ({ project, dark, index }: { project: any; dark: boolean; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`group rounded-2xl border transition-all duration-300 overflow-hidden
        ${dark ? "bg-[#111111] border-white/8 hover:border-white/20" : "bg-white border-black/8 hover:border-black/20"}
      `}>
        {/* Card header */}
        <div className="p-7 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div>
              <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${dark ? "text-[#7B9CF4]" : "text-[#3A6BDB]"}`}>
                Project {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">{project.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {project.tags.map((tag: string) => (
                <span key={tag} className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md
                  ${dark ? "bg-white/6 text-white/50 border border-white/8" : "bg-black/4 text-black/50 border border-black/8"}
                `}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className={`text-sm md:text-base leading-relaxed ${dark ? "text-white/55" : "text-black/55"}`}>
            {project.desc}
          </p>
        </div>

        {/* Expandable section */}
        <div className={`border-t transition-colors ${dark ? "border-white/6" : "border-black/6"}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full px-7 md:px-10 py-4 flex items-center justify-between text-left text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors
              ${dark ? "text-white/40 hover:text-[#7B9CF4]" : "text-black/40 hover:text-[#3A6BDB]"}
            `}
          >
            {isExpanded ? "Show less" : "View details"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="opacity-60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </motion.span>
          </button>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-10 pb-8">
              <ul className="space-y-4 mb-8">
                {project.details.map((point: string, i: number) => (
                  <li key={i} className={`flex gap-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-black/60"}`}>
                    <span className={`shrink-0 mt-0.5 font-mono text-xs font-bold ${dark ? "text-[#7B9CF4]" : "text-[#3A6BDB]"}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {project.hasArchitecture && (
                <div className="space-y-5">
                  <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/30" : "text-black/30"}`}>
                    Architecture
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { src: project.img1, label: "ML Pipeline" },
                      { src: project.img2, label: "System Architecture" },
                    ].map((img) => (
                      <div key={img.label} className="space-y-2">
                        <p className={`text-[9px] font-medium tracking-wider uppercase ${dark ? "text-white/25" : "text-black/25"}`}>{img.label}</p>
                        <div className={`relative aspect-video rounded-xl overflow-hidden border ${dark ? "border-white/8 bg-black/40" : "border-black/8 bg-black/5"}`}>
                          <Image src={img.src} alt={img.label} fill className="object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </FadeIn>
  );
};

export default function Home() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Scroll state for header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section tracking
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  // Theme CSS vars
  const bg = dark ? "#0A0A0A" : "#F7F7F5";
  const fg = dark ? "#F2F2F2" : "#111111";
  const accent = dark ? "#7B9CF4" : "#3A6BDB";
  const muted = dark ? "rgba(242,242,242,0.45)" : "rgba(17,17,17,0.45)";
  const cardBg = dark ? "#111111" : "#FFFFFF";
  const borderCol = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const navItems = ["About", "Experience", "Skills", "Projects", "Contact"];

  const projectData = [
    {
      title: "Cyber Attack Detection System",
      desc: "Real-time intrusion detection using a hybrid Random Forest + CNN pipeline, optimized for low-latency threat classification.",
      tags: ["ML/DL", "Python", "Cybersecurity"],
      hasArchitecture: true,
      details: [
        "Hybrid framework: Random Forest and XGBoost for tabular classification, CNN for spatial pattern recognition across network traffic.",
        "Feature engineering and PCA-based dimensionality reduction to isolate the 10 highest-signal features, cutting inference latency.",
        "Achieved high-precision real-time monitoring with optimized model efficiency suitable for live deployment.",
      ],
      img1: "/cyber-arch-2.png",
      img2: "/cyber-arch-1.png",
    },
    {
      title: "Vinoba Platform — Data & Automation",
      desc: "End-to-end data engineering suite handling 300,000+ rows, reducing manual processing time by 80% across scholarship and exam pipelines.",
      tags: ["Python", "Streamlit", "Apps Script"],
      hasArchitecture: false,
      details: [
        "Scholarship Data Tool: Python + Streamlit pipeline processes 300k+ rows in minutes, replacing brittle Excel-based workflows entirely.",
        "Intelligent Name Matching: Token-based fuzzy matching engine in Google Apps Script, outperforming VLOOKUP and reducing manual effort by 40%.",
        "End-to-End Exam System: Designed centralized system for center allocation, roll number generation, and digital admit card delivery.",
      ],
    },
  ];

  return (
    <main
      style={{ background: bg, color: fg }}
      className="transition-colors duration-500 min-h-screen font-sans overflow-x-hidden"
    >
      {/* ─── SUBTLE AMBIENT BG: single static gradient, no animation ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: dark
            ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,142,240,0.07) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(58,107,219,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ─── HEADER / NAV ─── */}
      <header
        style={{
          background: scrolled ? (dark ? "rgba(10,10,10,0.85)" : "rgba(247,247,245,0.85)") : "transparent",
          borderBottom: scrolled ? `1px solid ${borderCol}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
          {/* Logo / name */}
          <a
            href="#home"
            className="text-sm font-semibold tracking-tight"
            style={{ color: fg }}
          >
            Omkar<span style={{ color: accent }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200"
                style={{
                  color: activeSection === item.toLowerCase() ? accent : muted,
                  background: activeSection === item.toLowerCase() ? (dark ? "rgba(123,156,244,0.1)" : "rgba(58,107,219,0.08)") : "transparent",
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Social icons — top right on mobile, shown inline with nav on desktop */}
            <div className="flex items-center gap-1">
              {[
                { icon: <Icons.Github />, href: "https://github.com/omkarsinare/Portfolio", label: "GitHub" },
                { icon: <Icons.Linkedin />, href: "https://www.linkedin.com/in/omkar-sinare-4aaab8229/", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: muted }}
                  onMouseEnter={e => (e.currentTarget.style.color = accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = muted)}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="h-8 px-3 rounded-full border text-[10px] font-semibold tracking-widest uppercase transition-all"
              style={{ borderColor: borderCol, color: muted }}
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 md:px-10 max-w-6xl mx-auto"
      >
        <div className="flex flex-col items-start max-w-3xl">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-10"
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }}
            />
            <span className="text-xs font-medium tracking-wide" style={{ color: muted }}>
              Available for opportunities
            </span>
          </motion.div>

          {/* Avatar + name row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 shrink-0"
              style={{ borderColor: borderCol }}
            >
              <Image
                src="/profile.jpg"
                alt="Omkar Sinare"
                width={64}
                height={64}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: muted }}>
                Omkar Sinare
              </p>
              <p className="text-xs" style={{ color: muted, opacity: 0.6 }}>
                Pune, Maharashtra
              </p>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            Data Engineer.{" "}
            <span style={{ color: accent }}>Automation</span> Specialist.
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg font-medium mb-10 h-8"
            style={{ color: muted }}
          >
            <Typewriter
              options={{ autoStart: true, loop: true, delay: 40, deleteSpeed: 20 }}
              onInit={(t) => {
                t
                  .typeString("Processing 300k+ rows with Python & Streamlit")
                  .pauseFor(1800)
                  .deleteAll(10)
                  .typeString("Detecting cyber threats with Deep Learning")
                  .pauseFor(1800)
                  .deleteAll(10)
                  .typeString("Cutting manual effort by 40% through automation")
                  .pauseFor(1800)
                  .deleteAll(10)
                  .start();
              }}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
                style={{ background: accent, color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all border"
                style={{ borderColor: borderCol, color: fg }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = borderCol)}
              >
                View work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: muted, opacity: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <rect x="1" y="1" width="14" height="18" rx="7" stroke="currentColor" strokeWidth="1.5"/>
              <motion.rect
                x="6.5" y="4" width="3" height="5" rx="1.5"
                fill="currentColor"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
          <span className="text-[9px] tracking-widest uppercase font-medium">Scroll</span>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">

        {/* Divider */}
        <div className="h-px w-full mb-24 md:mb-32" style={{ background: borderCol }} />

        {/* ─── ABOUT ─── */}
        <section id="about" className="scroll-mt-20 mb-24 md:mb-36">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: accent }}>
              About
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            <FadeIn delay={0.1} className="md:col-span-3">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight leading-snug mb-6">
                I turn data chaos into{" "}
                <span style={{ color: accent }}>scalable systems</span>.
              </h2>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: muted }}>
                I'm a Data Engineer and Automation Specialist focused on solving real operational bottlenecks. From processing 300k+ row datasets to building custom fuzzy matching engines, I transform manual chaos into reliable, automated workflows that teams actually use.
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: 300000, suf: "+", label: "Rows Handled" },
                  { val: 40, suf: "%", label: "Effort Saved" },
                  { val: 2, suf: "+", label: "Years Building" },
                  { val: 5, suf: "+", label: "Tools Shipped" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border"
                    style={{ background: cardBg, borderColor: borderCol }}
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: accent }}>
                      <Counter value={s.val} suffix={s.suf} />
                    </p>
                    <p className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: muted }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section id="experience" className="scroll-mt-20 mb-24 md:mb-36">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-10" style={{ color: accent }}>
              Experience
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                role: "Data Analyst L1",
                company: "Open Links Foundation",
                logo: "https://www.openlinksfoundation.org/images/openlinksFoundationsLogo.png",
                period: "Dec 2024 – Present",
                type: "Full-time",
                points: [
                  "Built automated exam pipeline covering center allocation, roll numbers, and admit cards.",
                  "Developed token-based fuzzy matching engine reducing manual lookup effort by 40%.",
                  "Architected Streamlit scholarship dashboards processing 300k+ records.",
                ],
              },
              {
                role: "Java Developer Intern",
                company: "TechnoHacks Edutech",
                logo: "https://technohacks.co.in/wp-content/uploads/2024/08/cropped-png-transperant-Copy-1.png",
                period: "Oct 2023 – Dec 2023",
                type: "Internship",
                points: [
                  "Developed GUI-based ATM simulation with full transaction lifecycle.",
                  "Applied OOP patterns across multiple tooling projects.",
                ],
              },
            ].map((exp, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div
                  className="p-6 md:p-8 rounded-2xl border transition-all duration-200"
                  style={{ background: cardBg, borderColor: borderCol }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = dark ? "rgba(123,156,244,0.25)" : "rgba(58,107,219,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = borderCol)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/8 flex items-center justify-center p-2 shrink-0">
                      <img src={exp.logo} alt={exp.company} className="w-full h-auto object-contain" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="text-base font-semibold">{exp.role}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase"
                            style={{ background: dark ? "rgba(123,156,244,0.1)" : "rgba(58,107,219,0.08)", color: accent }}
                          >
                            {exp.type}
                          </span>
                          <span className="text-[10px] font-medium" style={{ color: muted }}>
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold mb-4" style={{ color: accent }}>
                        {exp.company}
                      </p>
                      <ul className="space-y-2">
                        {exp.points.map((p, i) => (
                          <li key={i} className="flex gap-3 text-sm" style={{ color: muted }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section id="skills" className="scroll-mt-20 mb-24 md:mb-36">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-10" style={{ color: accent }}>
              Skills
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {skills.map((skill, i) => (
                <Magnetic key={skill.name} distance={0.25}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-default transition-all duration-200"
                    style={{ background: cardBg, borderColor: borderCol }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = dark ? "rgba(123,156,244,0.3)" : "rgba(58,107,219,0.3)";
                      e.currentTarget.style.background = dark ? "rgba(123,156,244,0.05)" : "rgba(58,107,219,0.04)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = borderCol;
                      e.currentTarget.style.background = cardBg;
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-5 h-5 object-contain transition-all"
                      style={{ filter: dark ? "grayscale(0.4) brightness(0.9)" : "none" }}
                    />
                    <span className="text-xs font-semibold">{skill.name}</span>
                    <span
                      className="text-[9px] font-medium ml-0.5"
                      style={{ color: muted, opacity: 0.6 }}
                    >
                      {skill.level}
                    </span>
                  </motion.div>
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="scroll-mt-20 mb-24 md:mb-36">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-10" style={{ color: accent }}>
              Featured Projects
            </p>
          </FadeIn>

          <div className="space-y-5">
            {projectData.map((proj, idx) => (
              <ProjectCard key={idx} project={proj} dark={dark} index={idx} />
            ))}
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="scroll-mt-20 mb-20 md:mb-28">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: accent }}>
              Contact
            </p>
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight leading-snug mb-12 max-w-xl">
              Have a project in mind?{" "}
              <span style={{ color: accent }}>Let's talk.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Left: links */}
            <FadeIn delay={0.1} className="space-y-5">
              {[
                { icon: <Icons.Mail />, val: "omkarsinare0@gmail.com", href: "mailto:omkarsinare0@gmail.com" },
                { icon: <Icons.Linkedin />, val: "linkedin.com/in/omkarsinare", href: "https://www.linkedin.com/in/omkar-sinare-4aaab8229/" },
                { icon: <Icons.Phone />, val: "+91 86690 68591", href: "tel:+918669068591" },
                { icon: <Icons.MapPin />, val: "Pune, Maharashtra, India", href: "https://maps.google.com/?q=Pune" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-all"
                    style={{ borderColor: borderCol, color: muted }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = accent;
                      e.currentTarget.style.color = accent;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = borderCol;
                      e.currentTarget.style.color = muted;
                    }}
                  >
                    {c.icon}
                  </div>
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = fg)}
                    onMouseLeave={e => (e.currentTarget.style.color = muted)}
                  >
                    {c.val}
                  </span>
                </a>
              ))}
            </FadeIn>

            {/* Right: form */}
            <FadeIn delay={0.2}>
              <form
                action="https://formspree.io/f/xlgoqjpa"
                method="POST"
                className="space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      background: cardBg,
                      borderColor: borderCol,
                      color: fg,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = borderCol)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      background: cardBg,
                      borderColor: borderCol,
                      color: fg,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = borderCol)}
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Tell me about your project…"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                  style={{
                    background: cardBg,
                    borderColor: borderCol,
                    color: fg,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = borderCol)}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{ background: accent, color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Send Message <Icons.Send />
                </button>
              </form>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* ─── FOOTER ─── */}
      <footer
        className="border-t py-8 px-5 md:px-10"
        style={{ borderColor: borderCol }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium" style={{ color: muted, opacity: 0.5 }}>
            © 2025 Omkar Sinare · Pune, Maharashtra
          </p>
          <Magnetic>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all"
              style={{ borderColor: borderCol, color: muted }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = borderCol;
                e.currentTarget.style.color = muted;
              }}
            >
              <Icons.ArrowUp />
            </button>
          </Magnetic>
        </div>
      </footer>
    </main>
  );
}
