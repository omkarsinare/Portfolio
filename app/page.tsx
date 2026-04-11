"use client";

import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, animate, useInView } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";
import Typewriter from 'typewriter-effect';

// --- TYPES & DATA ---
interface MagneticProps {
    children: ReactNode;
    distance?: number;
}

interface CounterProps {
    value: number;
    suffix?: string;
}

interface Skill {
    name: string;
    level: string;
    icon: string;
}

// --- CUSTOM SVG ICONS ---
const Icons = {
    Linkedin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    ),
    Github: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
    ),
    Mail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    ),
    MapPin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
    Home: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    )
};

const Magnetic = ({ children, distance = 0.5 }: MagneticProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * distance);
        mouseY.set((clientY - centerY) * distance);
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

    useEffect(() => {
        if (inView) {
            const controls = animate(0, value, {
                duration: 2,
                onUpdate: (latest) => setCount(Math.floor(latest)),
            });
            return () => controls.stop();
        }
    }, [inView, value]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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
    { name: "OpenCV", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" }
];

const ProjectCard = ({ project, dark, onImageClick }: { project: any, dark: boolean, onImageClick: (src: string) => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div className={`p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-black/10"} group hover:border-cyan-500/30 transition-all`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl md:text-4xl font-bold italic">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] md:text-[10px] border border-cyan-500/30 text-cyan-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                </div>
            </div>
            
            <p className="opacity-60 max-w-2xl text-base md:text-lg mb-8">{project.desc}</p>

            <button onClick={() => setIsExpanded(!isExpanded)} className={`mb-6 text-[10px] font-black tracking-widest uppercase py-2.5 px-8 rounded-full border transition-all ${dark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"} text-cyan-500`}>
                {isExpanded ? "Show Less" : "Know More"}
            </button>

            {isExpanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-8 border-t border-white/5 overflow-hidden">
                    <ul className="space-y-4 mb-12">
                        {project.details.map((point: string, i: number) => (
                            <li key={i} className="flex gap-4 text-sm md:text-base opacity-70 leading-relaxed">
                                <span className="text-cyan-500 font-bold">0{i+1}.</span> {point}
                            </li>
                        ))}
                    </ul>

                    {project.hasArchitecture && (
                        <div className="space-y-8">
                            <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-cyan-500 opacity-80 mb-6 text-center">Project Architecture & Workflow</h4>
                            <div className="max-w-xl mx-auto space-y-4">
                                <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest text-center">Technical Overview</p>
                                <div 
                                    onClick={() => onImageClick(project.img1)}
                                    className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl cursor-zoom-in group/img"
                                >
                                    <Image 
                                        src={project.img1} 
                                        alt="Architecture Diagram" 
                                        fill 
                                        className="object-contain p-4 transition-transform duration-700 group-hover/img:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl transition-opacity">Click to Enlarge</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default function Home() {
    const [dark, setDark] = useState(true);
    const [activeSection, setActiveSection] = useState("");
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedImg(null); };
        window.addEventListener('keydown', handleEsc);
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
        }, { threshold: 0.4 });
        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const projectData = [
        { 
            title: "Cyber Attack Detection System", 
            desc: "Built a real-time system using Random Forest and CNN, optimized for intrusion detection.", 
            tags: ["ML + DL", "Python", "Security"],
            hasArchitecture: true,
            details: [
                "Built a real-time cyber attack detection system using Random Forest, XGBoost, and CNN[cite: 24].",
                "Reduced dataset to top 10 features, improving performance and model efficiency[cite: 24].",
                "Integrated CNN layers to identify complex spatial patterns within network traffic logs."
            ],
            img1: "/p1.png"
        },
        { 
            title: "Scholarship Data Tool", 
            desc: "Engineered a scalable data pipeline using Python and Streamlit to process 300,000+ rows.", 
            tags: ["Python", "Streamlit", "Automation"],
            hasArchitecture: true,
            details: [
                "Built a Scholarship Data Tool using Python + Streamlit to generate student dashboards from raw data in minutes[cite: 30].",
                "Engineered a tool handling 300,000+ rows, eliminating Excel dependency and improving efficiency by 80%[cite: 30].",
                "Automated complex calculations for educational assessments across multiple districts."
            ],
            img1: "/p2.png"
        },
        { 
            title: "Fuzzy Matching & Exam System", 
            desc: "Developed token-based name matching and a centralized end-to-end exam management system.", 
            tags: ["GAS", "DBMS", "Apps Script"],
            hasArchitecture: true,
            details: [
                "Developed a token-based name matching system in Google Apps Script, outperforming VLOOKUP/XLOOKUP[cite: 31].",
                "Designed an end-to-end exam system including center allocation, roll number generation, and admit cards.",
                "Created a student portal via Apps Script for admit card access and student lookup."
            ],
            img1: "/Exam-system.png"
        }
    ];

    return (
        <main className={`${dark ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-700 min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col items-center`}>
            <motion.div className="pointer-events-none fixed inset-0 z-30 opacity-40" style={{ background: `radial-gradient(600px circle at ${springX}px ${springY}px, ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}, transparent 80%)` }} />

            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
                <Magnetic distance={0.3}>
                    <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all ${dark ? "bg-neutral-900 border-white/20 text-cyan-500 hover:border-cyan-500" : "bg-neutral-100 border-black/20 text-cyan-600 hover:border-cyan-600"}`}><Icons.Home /></button>
                </Magnetic>
            </div>
            
            <div className="fixed top-6 right-6 z-50">
                <Magnetic distance={0.2}>
                    <button onClick={() => setDark(!dark)} className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full border text-[9px] md:text-[10px] tracking-widest uppercase transition-all backdrop-blur-md font-bold ${dark ? "border-white/20 text-white hover:bg-white/10" : "border-black/40 text-black hover:bg-black/10"}`}>{dark ? "Light" : "Dark"}</button>
                </Magnetic>
            </div>

            <section id="home" className="relative w-full max-w-7xl flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen py-10 md:py-20 scroll-mt-24">
                <div key={dark ? "d" : "l"} className="relative flex items-center justify-center mb-8 md:mb-16">
                    {[0, 1, 2].map((i) => (
                        <motion.div key={i} className={`absolute rounded-full border-2 ${dark ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "border-black/80 shadow-[0_0_20px_rgba(0,0,0,0.1)]"}`} style={{ width: 160, height: 160 }} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [0.5, 1.2, 8], opacity: [0, dark ? 0.5 : 0.4, 0] }} transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: [0.21, 0.85, 0.45, 1], times: [0, 0.1, 1] }} />
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
                        <div className={`rounded-full p-1 border-2 ${dark ? "border-white/20" : "border-black/20"}`}><Image src="/profile.jpg" alt="Omkar Sinare" width={140} height={140} className={`rounded-full object-cover border-4 relative z-20 ${dark ? "border-white" : "border-black"} shadow-2xl md:w-[170px] md:h-[170px]`} priority /></div>
                    </motion.div>
                </div>
                <div className="flex flex-col items-center text-center w-full px-6 z-20">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold mb-4 md:mb-6">Data Analyst & Automation Engineer [cite: 5, 6]</motion.p>
                    <div className="h-[100px] md:h-[150px] flex items-center justify-center">
                        <div className="text-lg sm:text-2xl md:text-4xl font-bold max-w-4xl tracking-tight leading-snug">
                            <Typewriter options={{ autoStart: true, loop: true, delay: 40, deleteSpeed: 25 }} onInit={(typewriter) => { typewriter.typeString(`Hi, I'm <span style="color: #06b6d4;">Omkar Sinare</span> 👋 [cite: 1]`).pauseFor(1500).deleteAll().typeString(`I build <span style="color: #06b6d4;">Data Engines</span> for 300k+ records 📊 [cite: 30]`).pauseFor(1000).deleteAll().typeString(`I detect Cyber Attacks with <span style="color: #06b6d4;">Deep Learning</span> 🛡️ [cite: 24]`).pauseFor(1000).deleteAll().typeString(`I save teams <span style="color: #06b6d4;">40% effort</span> through automation ⚡ [cite: 16]`).pauseFor(2000).start(); }} />
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full max-w-5xl px-6 space-y-24 md:space-y-60 py-10 md:py-40 relative z-20">
                <section id="projects" className="scroll-mt-24">
                    <h2 className={`text-[10px] tracking-[1em] uppercase mb-12 md:mb-16 text-center font-bold transition-all ${activeSection === 'projects' ? 'text-cyan-500' : 'opacity-30'}`}>Featured Projects [cite: 22]</h2>
                    <div className="space-y-8 md:space-y-12">
                        {projectData.map((proj, idx) => (
                            <ProjectCard key={idx} project={proj} dark={dark} onImageClick={setSelectedImg} />
                        ))}
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white opacity-50 hover:opacity-100 transition-opacity z-[110]" onClick={() => setSelectedImg(null)}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full h-full max-w-7xl max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image src={selectedImg} alt="Fullscreen View" fill className="object-contain" quality={100} priority />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className={`w-full py-10 md:py-20 border-t ${dark ? "border-white/5" : "border-black/5"} text-center z-20`}>
                <p className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase opacity-30">© 2026 Omkar Sinare. Engineered for scale. [cite: 1]</p>
            </footer>
        </main>
    );
}
