"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, animate, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Typewriter from 'typewriter-effect';

// --- CUSTOM SVG ICONS (Internal to ensure they always load) ---
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

// --- HELPER: MAGNETIC EFFECT ---
const Magnetic = ({ children, distance = 0.5 }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, target } = e;
        const { left, top, width, height } = target.getBoundingClientRect();
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

// --- HELPER: COUNTING NUMBER ---
const Counter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
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

// --- SKILL DATA ---
const skills = [
    { name: "Python", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TensorFlow", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "SQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "AWS", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Git", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Java", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    // STREAMLIT FIXED ICON
    { name: "Streamlit", level: "Advanced", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
    { name: "Pandas", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "OpenCV", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" }
];

export default function Home() {
    const [dark, setDark] = useState(true);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const emojiFilter = dark ? "brightness(1.2)" : "brightness(0.9)";

    return (
        <main className={`${dark ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-700 min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden relative`}>

            {/* CURSOR GLOW */}
            <motion.div className="pointer-events-none fixed inset-0 z-30 opacity-40" style={{ background: `radial-gradient(600px circle at ${springX}px ${springY}px, ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}, transparent 80%)` }} />

            {/* HOME BUTTON */}
            <div className="fixed bottom-10 right-10 z-50">
                <Magnetic distance={0.3}>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all ${dark ? "bg-neutral-900 border-white/20 text-cyan-500 hover:border-cyan-500" : "bg-neutral-100 border-black/20 text-cyan-600 hover:border-cyan-600"}`}>
                        <Icons.Home />
                    </button>
                </Magnetic>
            </div>

            {/* TOGGLE BUTTON */}
            <div className="fixed top-6 right-6 z-50">
                <Magnetic distance={0.2}>
                    <button onClick={() => setDark(!dark)} className={`px-6 py-2 rounded-full border text-[10px] tracking-widest uppercase transition-all backdrop-blur-md ${dark ? "border-white/20 hover:bg-white/10" : "border-black/60 hover:bg-black/10"}`}>
                        {dark ? "Light" : "Dark"}
                    </button>
                </Magnetic>
            </div>

            {/* HERO SECTION */}
            <section className="h-screen relative flex flex-col items-center justify-start pt-[15vh]">
                <div key={dark ? "d" : "l"} className="relative flex items-center justify-center mb-12">
                    {[0, 1, 2].map((i) => (
                        <motion.div key={i} className={`absolute rounded-full border-2 ${dark ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "border-black/80 shadow-[0_0_20px_rgba(0,0,0,0.1)]"}`} style={{ width: 200, height: 200 }} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [0.5, 1.2, 8], opacity: [0, dark ? 0.5 : 0.4, 0] }} transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: [0.21, 0.85, 0.45, 1], times: [0, 0.1, 1] }} />
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
                        <Image src="/profile.jpg" alt="Omkar Sinare" width={160} height={160} className={`rounded-full object-cover border-4 relative z-20 ${dark ? "border-white" : "border-black"} shadow-2xl`} />
                    </motion.div>
                </div>

                <div className="flex flex-col items-center text-center w-full px-4 z-20 min-h-[180px]">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="tracking-[0.6em] text-[10px] uppercase mr-[-0.6em] font-bold mb-5">Data Analyst & Automation Engineer</motion.p>
                    <div className="text-xl sm:text-3xl font-bold max-w-none whitespace-nowrap tracking-tight">
                        <Typewriter options={{ autoStart: true, loop: true, delay: 40, deleteSpeed: 25 }} onInit={(typewriter) => { typewriter.typeString(`Hi, I'm <span style="color: #06b6d4;">Omkar Sinare</span> <span style="filter: ${emojiFilter}">👋</span>`).pauseFor(1500).deleteAll().typeString(`I build <span style="color: #06b6d4;">Data Engines</span> for 300k+ records <span style="filter: ${emojiFilter}">📊</span>`).pauseFor(1000).deleteAll().typeString(`I detect Cyber Attacks with <span style="color: #06b6d4;">Deep Learning</span> <span style="filter: ${emojiFilter}">🛡️</span>`).pauseFor(1000).deleteAll().typeString(`I save teams <span style="color: #06b6d4;">40% effort</span> through automation <span style="filter: ${emojiFilter}">⚡</span>`).pauseFor(1000).deleteAll().typeString(`Driven by data and a <span style="color: #06b6d4;">Cappuccino</span> <span style="filter: ${emojiFilter}">☕</span>`).pauseFor(2000).start(); }} />
                    </div>
                    <nav className="flex gap-8 mt-14 text-[10px] font-black tracking-[0.4em] mr-[-0.4em]">
                        {["ABOUT", "EXPERIENCE", "SKILLS", "PROJECTS", "CONTACT"].map((item) => (
                            <Magnetic key={item}><a href={`#${item.toLowerCase()}`} className="opacity-40 hover:opacity-100 transition-opacity">{item}</a></Magnetic>
                        ))}
                    </nav>
                </div>
            </section>

            {/* CONTENT SECTIONS */}
            <div className="max-w-5xl mx-auto px-6 space-y-60 py-40 relative z-20">

                {/* SUMMARY SECTION */}
                <section id="about" className="scroll-mt-24 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-4xl font-bold mb-8">Summary</h2>
                        <p className="text-xl leading-relaxed opacity-60">I am a Data Engineer and Automation Specialist dedicated to solving operational bottlenecks. From processing 300k+ row datasets to building custom "AI-like" fuzzy matching engines, I transform manual chaos into scalable, automated systems.</p>
                    </motion.div>
                    <div className="flex gap-12 md:gap-20 items-start">
                        <div className="flex flex-col">
                            <span className="text-6xl font-bold text-cyan-500"><Counter value={300000} suffix="+" /></span>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-bold whitespace-nowrap">Rows Handled</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-6xl font-bold text-cyan-500"><Counter value={40} suffix="%" /></span>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-bold whitespace-nowrap">Manual Effort Saved</span>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="scroll-mt-24">
                    <h2 className="text-[10px] tracking-[1em] uppercase opacity-30 mb-16 text-center">Experience</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Open Links Foundation */}
                        <motion.div whileHover={{ y: -5 }} className={`p-8 rounded-3xl border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/5"} shadow-sm transition-all`}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center p-2 bg-white overflow-hidden shadow-inner"><img src="https://www.openlinksfoundation.org/images/openlinksFoundationsLogo.png" alt="Open Links" className="w-full h-auto object-contain" /></div>
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight">Technical Associate</h3>
                                    <p className="text-cyan-500 font-bold text-sm mt-1 uppercase tracking-wider">Open Links Foundation</p>
                                </div>
                                <div className="space-y-4 pt-4 border-t w-full border-white/10 text-sm opacity-60 leading-relaxed">
                                    <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Dec 2024 - Present</p>
                                    <ul className="space-y-3">
                                        <li>• Built automated Exam Pipeline handling student registration.</li>
                                        <li>• Developed a Token-based Fuzzy Matching engine.</li>
                                        <li>• Architected Scholarship Dashboards for 300,000+ rows.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                        {/* TechnoHacks */}
                        <motion.div whileHover={{ y: -5 }} className={`p-8 rounded-3xl border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/5"} shadow-sm transition-all`}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center p-4 bg-white overflow-hidden shadow-inner"><img src="https://technohacks.co.in/wp-content/uploads/2024/08/cropped-png-transperant-Copy-1.png" alt="TechnoHacks" className="w-full h-auto object-contain" /></div>
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight">Java Intern</h3>
                                    <p className="text-cyan-500 font-bold text-sm mt-1 uppercase tracking-wider">TechnoHacks Edutech</p>
                                </div>
                                <div className="space-y-4 pt-4 border-t w-full border-white/10 text-sm opacity-60 leading-relaxed">
                                    <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Oct 2023 - Nov 2023</p>
                                    <ul className="space-y-3">
                                        <li>• Developed functional GUI-based ATM simulations.</li>
                                        <li>• Applied OOP principles for automated tools.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section id="skills" className="scroll-mt-24">
                    <h2 className="text-[10px] tracking-[1em] uppercase opacity-30 mb-8 text-center">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto">
                        {skills.map((skill) => (
                            <Magnetic key={skill.name} distance={0.3}>
                                <div className="relative group">
                                    <motion.div whileHover={{ scale: 1.1 }} className={`w-24 h-24 rounded-full border flex items-center justify-center p-5 transition-all duration-500 ${dark ? "border-white/10 bg-neutral-900/50 hover:border-cyan-500/50" : "border-black/10 bg-neutral-50 hover:border-cyan-500/50"}`}><img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" /></motion.div>
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                        <div className="bg-cyan-600 text-white px-4 py-2 rounded-xl shadow-2xl flex flex-col items-center min-w-[110px] relative">
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 whitespace-nowrap">{skill.name}</span>
                                            <span className="text-[8px] font-bold opacity-80 uppercase tracking-tighter leading-none whitespace-nowrap">{skill.level}</span>
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
                    <h2 className="text-[10px] tracking-[1em] uppercase opacity-30 mb-20 text-center">Featured Projects</h2>
                    <div className="space-y-24">
                        <motion.div className={`sticky top-32 p-12 rounded-[3.5rem] border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-black/10"} group`}>
                            <h3 className="text-3xl font-bold mb-4">Cyber Attack Detection</h3>
                            <p className="opacity-60 max-w-xl text-lg mb-8">Built a real-time system using Random Forest and CNN, optimized for security in intrusion detection.</p>
                            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity"><span>ML + DL</span> <span>Python</span> <span>Security</span></div>
                        </motion.div>
                        <motion.div className={`sticky top-44 p-12 rounded-[3.5rem] border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-black/10"} group`}>
                            <h3 className="text-3xl font-bold mb-4">Vinoba Data Automation</h3>
                            <p className="opacity-60 max-w-xl text-lg mb-8">Engineered a Scholarship tool handling 300,000+ rows, improving processing speed by 80%.</p>
                            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity"><span>Python</span> <span>Streamlit</span> <span>Big Data</span></div>
                        </motion.div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="scroll-mt-24">
                    <h2 className="text-4xl font-extrabold mb-10 leading-tight">I have got just what you need. <br /><span className="underline decoration-cyan-500">Lets talk.</span></h2>
                    <div className="grid md:grid-cols-2 gap-20">
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-cyan-500 transition-colors group-hover:border-cyan-500"><Icons.Mail /></div>
                                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">omkarsinare@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-cyan-500 transition-colors group-hover:border-cyan-500"><Icons.Linkedin /></div>
                                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">linkedin.com/in/omkarsinare</span>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-cyan-500 transition-colors group-hover:border-cyan-500"><Icons.MapPin /></div>
                                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">Pune, Maharashtra</span>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" className={`p-4 rounded-xl border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/10"} outline-none focus:border-cyan-500 transition-all text-sm`} />
                                <input type="email" placeholder="Email" className={`p-4 rounded-xl border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/10"} outline-none focus:border-cyan-500 transition-all text-sm`} />
                            </div>
                            <textarea placeholder="Message" rows={5} className={`w-full p-4 rounded-xl border ${dark ? "bg-neutral-900 border-white/10" : "bg-neutral-50 border-black/10"} outline-none focus:border-cyan-500 transition-all text-sm resize-none`} />
                            <button className="w-full py-4 rounded-xl bg-cyan-600 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-500 transition-all">Send Message <Icons.Send /></button>
                        </form>
                    </div>
                </section>
            </div>

            <footer className="py-20 text-center opacity-20 text-[9px] tracking-[1em] uppercase font-bold">Omkar Sinare • Pune, Maharashtra</footer>
        </main>
    );
}