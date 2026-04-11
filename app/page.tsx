"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, animate, useInView } from "framer-motion";
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
    ),
    Send: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
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

export default function Home() {
    const [dark, setDark] = useState(true);
    const [activeSection, setActiveSection] = useState("");
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

    // --- Observer for Active Section ---
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.4 } // Section must cover 40% of viewport to be "active"
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const emojiFilter = dark ? "brightness(1.2)" : "brightness(0.9)";

    return (
        <main className={`${dark ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-700 min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col items-center`}>

            {/* CURSOR GLOW */}
            <motion.div className="pointer-events-none fixed inset-0 z-30 opacity-40" style={{ background: `radial-gradient(600px circle at ${springX}px ${springY}px, ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}, transparent 80%)` }} />

            {/* HOME BUTTON */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
                <Magnetic distance={0.3}>
                    <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all ${dark ? "bg-neutral-900 border-white/20 text-cyan-500 hover:border-cyan-500" : "bg-neutral-100 border-black/20 text-cyan-600 hover:border-cyan-600"}`}>
                        <Icons.Home />
                    </button>
                </Magnetic>
            </div>

            {/* TOGGLE BUTTON */}
            <div className="fixed top-6 right-6 z-50">
                <Magnetic distance={0.2}>
                    <button onClick={() => setDark(!dark)} className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full border text-[9px] md:text-[10px] tracking-widest uppercase transition-all backdrop-blur-md font-bold ${dark ? "border-white/20 text-white hover:bg-white/10" : "border-black/40 text-black hover:bg-black/10"}`}>
                        {dark ? "Light" : "Dark"}
                    </button>
                </Magnetic>
            </div>

            {/* HERO SECTION */}
            <section id="home" className="relative w-full max-w-7xl flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen py-10 md:py-20 scroll-mt-24">
                <div key={dark ? "d" : "l"} className="relative flex items-center justify-center mb-8 md:mb-16">
                    {[0, 1, 2].map((i) => (
                        <motion.div key={i} className={`absolute rounded-full border-2 ${dark ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "border-black/80 shadow-[0_0_20px_rgba(0,0,0,0.1)]"}`} style={{ width: 160, height: 160 }} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [0.5, 1.2, 8], opacity: [0, dark ? 0.5 : 0.4, 0] }} transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: [0.21, 0.85, 0.45, 1], times: [0, 0.1, 1] }} />
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
                        <div className={`rounded-full p-1 border-2 ${dark ? "border-white/20" : "border-black/20"}`}>
                             <Image src="/profile.jpg" alt="Omkar Sinare" width={140} height={140} className={`rounded-full object-cover border-4 relative z-20 ${dark ? "border-white" : "border-black"} shadow-2xl md:w-[170px] md:h-[170px]`} priority />
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center text-center w-full px-6 z-20">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold mb-4 md:mb-6">Data Analyst & Automation Engineer</motion.p>
                    
                    <div className="h-[100px] md:h-[150px] flex items-center justify-center">
                        <div className="text-lg sm:text-2xl md:text-4xl font-bold max-w-4xl tracking-tight leading-snug">
                            <Typewriter options={{ autoStart: true, loop: true, delay: 40, deleteSpeed: 25 }} onInit={(typewriter) => { typewriter.typeString(`Hi, I'm <span style="color: #06b6d4;">Omkar Sinare</span> <span style="filter: ${emojiFilter}">👋</span>`).pauseFor(1500).deleteAll().typeString(`I build <span style="color: #06b6d4;">Data Engines</span> for 300k+ records <span style="filter: ${emojiFilter}">📊</span>`).pauseFor(1000).deleteAll().typeString(`I detect Cyber Attacks with <span style="color: #06b6d4;">Deep Learning</span> <span style="filter: ${emojiFilter}">🛡️</span>`).pauseFor(1000).deleteAll().typeString(`I save teams <span style="color: #06b6d4;">40% effort</span> through automation <span style="filter: ${emojiFilter}">⚡</span>`).pauseFor(1000).deleteAll().typeString(`Driven by data and a <span style="color: #06b6d4;">Cappuccino</span> <span style="filter: ${emojiFilter}">☕</span>`).pauseFor(2000).start(); }} />
                        </div>
                    </div>
                    
                    <nav className="flex flex-wrap justify-center gap-3 md:gap-8 mt-10 md:mt-24">
                        {["ABOUT", "EXPERIENCE", "SKILLS", "PROJECTS", "CONTACT"].map((item) => (
                            <Magnetic key={item} distance={0.25}>
                                <a href={`#${item.toLowerCase()}`}>
                                    <button 
                                        className={`px-4 py-2 md:px-7 md:py-2.5 rounded-full border text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md relative overflow-hidden group
                                            ${dark 
                                                ? "border-white/10 text-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-cyan-500/50" 
                                                : "border-black/10 text-black bg-black/5 shadow-[0_0_15px_rgba(0,0,0,0.03)] hover:border-cyan-600/50"
                                            } ${activeSection === item.toLowerCase() ? "border-cyan-500/80 !text-cyan-400" : ""}`}
                                    >
                                        <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-300">{item}</span>
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${dark ? "bg-cyan-500/5" : "bg-cyan-600/5"}`} />
                                    </button>
                                </a>
                            </Magnetic>
                        ))}
                    </nav>
                </div>
            </section>

            {/* CONTENT WRAPPER */}
            <div className="w-full max-w-5xl px-6 space-y-24 md:space-y-60 py-10 md:py-40 relative z-20">

                {/* SUMMARY SECTION */}
                <section id="about" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:pr-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 italic transition-colors">Summary</h2>
                        <p className="text-base md:text-xl leading-relaxed opacity-70 font-medium">I am a Data Engineer and Automation Specialist dedicated to solving operational bottlenecks. From processing 300k+ row datasets to building custom "AI-like" fuzzy matching engines, I transform manual chaos into scalable, automated systems.</p>
                    </motion.div>
                    
                    <div className="flex flex-row gap-8 md:gap-16 justify-between md:justify-end items-start md:pt-20">
                        <div className="flex flex-col">
                            <span className="text-3xl sm:text-5xl md:text-7xl font-bold text-cyan-500"><Counter value={300000} suffix="+" /></span>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 mt-3 font-bold whitespace-nowrap">Rows Handled</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl sm:text-5xl md:text-7xl font-bold text-cyan-500"><Counter value={40} suffix="%" /></span>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 mt-3 font-bold whitespace-nowrap">Manual Effort Saved</span>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="scroll-mt-24">
                    <h2 className={`text-[10px] tracking-[1em] uppercase mb-12 md:mb-16 text-center font-bold transition-all ${activeSection === 'experience' ? 'text-cyan-500 title-glow-cyan' : 'opacity-30'}`}>Experience</h2>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {[
                            {
                                role: "Technical Associate",
                                company: "Open Links Foundation",
                                logo: "https://www.openlinksfoundation.org/images/openlinksFoundationsLogo.png",
                                period: "Dec 2024 - Present",
                                points: ["Built automated Exam Pipeline.", "Developed Fuzzy Matching engine.", "Architected Scholarship Dashboards."]
                            },
                            {
                                role: "Java Intern",
                                company: "TechnoHacks Edutech",
                                logo: "https://technohacks.co.in/wp-content/uploads/2024/08/cropped-png-transperant-Copy-1.png",
                                period: "Oct 2023 - Nov 2023",
                                points: ["Developed GUI-based ATM simulations.", "Applied OOP principles for tools."]
                            }
                        ].map((exp, idx) => (
                            <motion.div key={idx} whileHover={{ y: -8 }} className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/5"} shadow-xl transition-all`}>
                                <div className="flex flex-col items-start gap-4 md:gap-6">
                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center p-3 bg-white overflow-hidden shadow-md">
                                        <img src={exp.logo} alt={exp.company} className="w-full h-auto object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold leading-tight">{exp.role}</h3>
                                        <p className="text-cyan-500 font-bold text-xs md:text-sm mt-1 uppercase tracking-widest">{exp.company}</p>
                                    </div>
                                    <div className="space-y-4 pt-6 border-t w-full border-white/10 text-sm md:text-base opacity-60 leading-relaxed">
                                        <p className="text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-40">{exp.period}</p>
                                        <ul className="space-y-3">
                                            {exp.points.map((p, i) => <li key={i}>• {p}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section id="skills" className="scroll-mt-24">
                    <h2 className={`text-[10px] tracking-[1em] uppercase mb-12 text-center font-bold transition-all ${activeSection === 'skills' ? 'text-cyan-500 title-glow-cyan' : 'opacity-30'}`}>Skills</h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-10 max-w-4xl mx-auto">
                        {skills.map((skill) => (
                            <Magnetic key={skill.name} distance={0.3}>
                                <div className="relative group">
                                    <motion.div whileHover={{ scale: 1.1 }} className={`w-16 h-16 md:w-24 md:h-24 rounded-full border flex items-center justify-center p-4 md:p-5 transition-all duration-500 ${dark ? "border-white/10 bg-neutral-900/50 hover:border-cyan-500/50" : "border-black/10 bg-neutral-50 hover:border-cyan-500/50"}`}>
                                        <img src={skill.icon} alt={skill.name} className={`w-8 h-8 md:w-12 md:h-12 object-contain transition-all ${dark ? "grayscale group-hover:grayscale-0" : ""}`} />
                                    </motion.div>
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                        <div className="bg-cyan-600 text-white px-3 py-2 rounded-xl shadow-2xl flex flex-col items-center min-w-[90px] md:min-w-[110px] relative">
                                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">{skill.name}</span>
                                            <span className="text-[7px] md:text-[8px] font-bold opacity-80 uppercase tracking-tighter">{skill.level}</span>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-600 rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="scroll-mt-24">
                    <h2 className={`text-[10px] tracking-[1em] uppercase mb-12 md:mb-16 text-center font-bold transition-all ${activeSection === 'projects' ? 'text-cyan-500 title-glow-cyan' : 'opacity-30'}`}>Featured Projects</h2>
                    <div className="space-y-8 md:space-y-24">
                        {[
                            { title: "Cyber Attack Detection", desc: "Built a real-time system using Random Forest and CNN, optimized for intrusion detection.", tags: ["ML + DL", "Python", "Security"] },
                            { title: "Vinoba Data Automation", desc: "Engineered a Scholarship tool handling 300,000+ rows, improving processing speed by 80%.", tags: ["Python", "Streamlit", "Big Data"] }
                        ].map((proj, idx) => (
                            <motion.div key={idx} className={`p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-black/10"} group hover:border-cyan-500/30 transition-colors`}>
                                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 italic">{proj.title}</h3>
                                <p className="opacity-60 max-w-2xl text-base md:text-xl mb-8 md:mb-10">{proj.desc}</p>
                                <div className="flex flex-wrap gap-3 md:gap-5 text-[9px] md:text-xs font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                                    {proj.tags.map(tag => <span key={tag} className="border border-current px-3 py-1 rounded-full">{tag}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="scroll-mt-24">
                    <h2 className={`text-3xl md:text-6xl font-extrabold mb-10 md:mb-12 leading-tight transition-all ${activeSection === 'contact' ? 'title-glow-cyan' : ''}`}>I&apos;ve got just what you need. <br /><span className={`${activeSection === 'contact' ? 'text-cyan-500' : ''} underline decoration-cyan-500 underline-offset-8`}>Let&apos;s talk.</span></h2>
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-6 md:space-y-12">
                            {[
                                { icon: <Icons.Mail />, val: "omkarsinare@gmail.com" },
                                { icon: <Icons.Linkedin />, val: "linkedin.com/in/omkarsinare" },
                                { icon: <Icons.MapPin />, val: "Pune, Maharashtra" }
                            ].map((c, idx) => (
                                <div key={idx} className="flex items-center gap-4 md:gap-6 group cursor-default">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-cyan-500 transition-colors group-hover:border-cyan-500">{c.icon}</div>
                                    <span className="text-base md:text-xl opacity-60 group-hover:opacity-100 transition-opacity font-medium">{c.val}</span>
                                </div>
                            ))}
                        </div>
                        <form className="space-y-4 md:space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                <input type="text" placeholder="Name" className={`p-4 md:p-5 rounded-2xl border ${dark ? "bg-neutral-900 border-white/10 text-white" : "bg-neutral-50 border-black/10 text-black"} outline-none focus:border-cyan-500 transition-all text-sm w-full`} />
                                <input type="email" placeholder="Email" className={`p-4 md:p-5 rounded-2xl border ${dark ? "bg-neutral-900 border-white/10 text-white" : "bg-neutral-50 border-black/10 text-black"} outline-none focus:border-cyan-500 transition-all text-sm w-full`} />
                            </div>
                            <textarea placeholder="Message" rows={5} className={`w-full p-4 md:p-5 rounded-2xl border ${dark ? "bg-neutral-900 border-white/10 text-white" : "bg-neutral-50 border-black/10 text-black"} outline-none focus:border-cyan-500 transition-all text-sm resize-none`} />
                            <button type="button" className="w-full py-4 md:py-5 rounded-2xl bg-cyan-600 text-white font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-cyan-500 transition-all active:scale-[0.98]">Send Message <Icons.Send /></button>
                        </form>
                    </div>
                </section>
            </div>

            <footer className="w-full py-10 md:py-24 text-center border-t border-white/5 mt-10 md:mt-20">
                <p className="opacity-20 text-[9px] md:text-xs tracking-[1em] uppercase font-bold px-4">Omkar Sinare • Pune, Maharashtra</p>
            </footer>
        </main>
    );
}
