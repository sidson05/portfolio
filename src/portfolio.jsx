import { useState, useEffect, useRef } from "react";

// ─── Theme ───────────────────────────────────────────────
const C = {
    bg: "#020d1a",
    bg2: "#040f20",
    navy: "#061428",
    blue: "#0ea5e9",
    cyan: "#22d3ee",
    glow: "#38bdf8",
    text: "#e0f2fe",
    muted: "#4a7fa5",
    border: "rgba(14,165,233,0.2)",
};

// ─── Data ────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Experience", "Projects", "Contact"];

const PROJECTS = [
    { title: "Handwriting Recognition", desc: "Deep learning model achieving high accuracy on handwritten character recognition using CNN architecture.", tags: ["Python", "TensorFlow", "CNN"], icon: "✍️" },
    { title: "Fish Freshness Detection", desc: "Analytics and machine learning-based project to detect fish freshness from photos using CNN. Achieved 80-90% accuracy.", tags: ["Python", "React", "ML", "CNN"], icon: "🐟" },
    { title: "BlogIt", desc: "Full-stack blogging application with responsive frontend, Python backend, SQLite storage, and analytical business intelligence insights.", tags: ["Python", "React", "HTML/CSS", "SQLite"], icon: "📝" },
    { title: "Smart Budget", desc: "Full-stack web application for personal finance management with automated budget generation and REST APIs.", tags: ["React.js", "Node.js", "ExpressJS", "MongoDB"], icon: "💰" },
    { title: "ConViz", desc: "Interactive web-based CNN visualization tool demonstrating real-time layer-wise animations and feature extraction.", tags: ["Python", "Streamlit", "CNN", "OpenCV"], icon: "👁️", link: "https://github.com/sidson05/ConViz" },
    { title: "Text Summarization", desc: "A text summarization project built with JavaScript to automatically generate concise summaries of long texts.", tags: ["JavaScript", "NLP"], icon: "📑", link: "https://github.com/sidson05/Text-summarization" },
    { title: "Text To SQL", desc: "An application that interprets natural language text and translates it into SQL queries automatically.", tags: ["JavaScript", "SQL", "AI"], icon: "🗄️", link: "https://github.com/sidson05/texttosql" },
];

const SKILLS = [
    { name: "Python / React.js", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "HTML / CSS", level: 88 },
    { name: "SQL & Databases", level: 80 },
    { name: "Software Testing", level: 85 },
    { name: "Data Modeling", level: 78 },
];

// ─── Helpers ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

// ─── Corner Brackets ─────────────────────────────────────
function Brackets({ size = 20, color = C.cyan }) {
    const line = { background: color, position: "absolute" };
    return (
        <>
            <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size }}>
                <div style={{ ...line, top: 0, left: 0, width: size, height: 2 }} />
                <div style={{ ...line, top: 0, left: 0, width: 2, height: size }} />
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, width: size, height: size }}>
                <div style={{ ...line, top: 0, right: 0, width: size, height: 2 }} />
                <div style={{ ...line, top: 0, right: 0, width: 2, height: size }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: size, height: size }}>
                <div style={{ ...line, bottom: 0, left: 0, width: size, height: 2 }} />
                <div style={{ ...line, bottom: 0, left: 0, width: 2, height: size }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: size, height: size }}>
                <div style={{ ...line, bottom: 0, right: 0, width: size, height: 2 }} />
                <div style={{ ...line, bottom: 0, right: 0, width: 2, height: size }} />
            </div>
        </>
    );
}

// ─── Particle Network ────────────────────────────────────
function ParticleCanvas() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let w, h, particles, raf;
        function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
        function init() {
            resize();
            const count = Math.floor((w * h) / 11000);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 2 + 0.8, alpha: Math.random() * 0.5 + 0.2,
            }));
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(14,165,233,${(1 - dist / 140) * 0.3})`; ctx.lineWidth = 0.8; ctx.stroke();
                    }
                }
            }
            particles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
                ctx.shadowColor = "#38bdf8"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
            });
            raf = requestAnimationFrame(draw);
        }
        init(); draw();
        window.addEventListener("resize", init);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
    }, []);
    return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}

// ─── Cursor ───────────────────────────────────────────────
function Cursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState({ x: -100, y: -100 });
    useEffect(() => {
        const move = e => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move);
    }, []);
    useEffect(() => {
        let raf; const lerp = (a, b, t) => a + (b - a) * t;
        const animate = () => { setTrail(prev => ({ x: lerp(prev.x, pos.x, 0.1), y: lerp(prev.y, pos.y, 0.1) })); raf = requestAnimationFrame(animate); };
        raf = requestAnimationFrame(animate); return () => cancelAnimationFrame(raf);
    }, [pos]);
    return (
        <>
            <div style={{ position: "fixed", top: pos.y - 4, left: pos.x - 4, width: 8, height: 8, background: C.cyan, borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />
            <div style={{ position: "fixed", top: trail.y - 16, left: trail.x - 16, width: 32, height: 32, border: `1.5px solid ${C.blue}70`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998 }} />
        </>
    );
}

// ─── Navbar ───────────────────────────────────────────────
function Navbar({ active, setActive }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => { const s = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 3rem", background: scrolled ? "rgba(2,13,26,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: 8, height: 8, background: C.cyan, borderRadius: "50%", boxShadow: `0 0 10px ${C.cyan}` }} />
                <span style={{ fontFamily: "'Courier New',monospace", fontSize: "1rem", fontWeight: 700, color: C.text, letterSpacing: "0.1em" }}>
                    SIDDHI<span style={{ color: C.cyan }}>.</span>SONGIRE
                </span>
            </div>
            <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
                {NAV_LINKS.map(link => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`} onClick={() => setActive(link)} style={{ fontFamily: "'Courier New',monospace", fontSize: "0.78rem", letterSpacing: "0.15em", color: active === link ? C.cyan : C.muted, textDecoration: "none", position: "relative", transition: "color 0.3s" }}
                            onMouseEnter={e => e.target.style.color = C.cyan}
                            onMouseLeave={e => e.target.style.color = active === link ? C.cyan : C.muted}
                        >
                            {link.toUpperCase()}
                            {active === link && <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: C.cyan, boxShadow: `0 0 6px ${C.cyan}` }} />}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
    const [typed, setTyped] = useState("");
    const roles = ["Software Developer", "IT Engineer", "ML Enthusiast", "QA Intern"];
    const [roleIdx, setRoleIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        const cur = roles[roleIdx]; const speed = deleting ? 55 : 95;
        const timer = setTimeout(() => {
            if (!deleting && charIdx < cur.length) { setTyped(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
            else if (!deleting && charIdx === cur.length) { setTimeout(() => setDeleting(true), 1400); }
            else if (deleting && charIdx > 0) { setTyped(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
            else { setDeleting(false); setRoleIdx(r => (r + 1) % roles.length); }
        }, speed);
        return () => clearTimeout(timer);
    }, [charIdx, deleting, roleIdx]);

    return (
        <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", padding: "0 2rem" }}>
            <ParticleCanvas />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(14,165,233,0.08) 0%, rgba(2,13,26,0.55) 60%, rgba(2,13,26,0.97) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #020d1a 0%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: "1.5rem", pointerEvents: "none" }}><Brackets size={30} color={C.cyan} /></div>

            <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "inline-block", fontFamily: "'Courier New',monospace", fontSize: "0.68rem", letterSpacing: "0.35em", color: C.cyan, border: `1px solid ${C.cyan}50`, padding: "0.3rem 1.2rem", marginBottom: "2rem", boxShadow: `0 0 20px ${C.cyan}15`, animation: "fadeUp 0.8s ease forwards" }}>
                    ◈ AVAILABLE FOR WORK ◈
                </div>
                <h1 style={{ fontFamily: "'Arial Black','Impact',sans-serif", fontSize: "clamp(3rem,9vw,7.5rem)", fontWeight: 900, lineHeight: 1, margin: "0 0 0.3rem", letterSpacing: "-0.02em", color: "white", textShadow: `0 0 40px ${C.blue}80, 0 0 80px ${C.blue}25`, animation: "fadeUp 0.8s 0.2s ease both", textTransform: "uppercase" }}>
                    Siddhi Songire
                </h1>
                <div style={{ height: "3rem", display: "flex", justifyContent: "center", alignItems: "center", animation: "fadeUp 0.8s 0.4s ease both" }}>
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "1.3rem", color: C.cyan, textShadow: `0 0 12px ${C.cyan}` }}>
                        {typed}<span style={{ animation: "blink 1s infinite" }}>_</span>
                    </span>
                </div>
                <p style={{ maxWidth: 500, margin: "1.2rem auto 2.5rem", color: "#5a9fc0", fontSize: "0.95rem", lineHeight: 1.8, animation: "fadeUp 0.8s 0.6s ease both" }}>
                    Passionate about full-stack development, machine learning, and software quality assurance.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.8s 0.8s ease both" }}>
                    <a href="#projects" style={{ padding: "0.8rem 2rem", background: "transparent", color: C.cyan, textDecoration: "none", border: `1px solid ${C.cyan}`, fontFamily: "'Courier New',monospace", fontSize: "0.78rem", letterSpacing: "0.15em", fontWeight: 700, boxShadow: `0 0 20px ${C.cyan}25`, transition: "all 0.3s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${C.cyan}12`; e.currentTarget.style.boxShadow = `0 0 40px ${C.cyan}55`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 20px ${C.cyan}25`; }}
                    >VIEW PROJECTS</a>
                    <a href="#contact" style={{ padding: "0.8rem 2rem", background: C.blue, color: "white", textDecoration: "none", border: `1px solid ${C.blue}`, fontFamily: "'Courier New',monospace", fontSize: "0.78rem", letterSpacing: "0.15em", boxShadow: `0 0 25px ${C.blue}45`, transition: "all 0.3s" }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 45px ${C.blue}75`}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 25px ${C.blue}45`}
                    >CONTACT ME</a>
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{ padding: "0.8rem 2rem", background: "transparent", color: C.glow, textDecoration: "none", border: `1px dashed ${C.glow}`, fontFamily: "'Courier New',monospace", fontSize: "0.78rem", letterSpacing: "0.15em", fontWeight: 700, boxShadow: `0 0 20px ${C.glow}25`, transition: "all 0.3s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${C.glow}12`; e.currentTarget.style.boxShadow = `0 0 40px ${C.glow}55`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 20px ${C.glow}25`; }}
                    >DOWNLOAD RESUME ↓</a>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "2rem", animation: "fadeUp 0.8s 0.9s ease both" }}>
                    <a href="https://github.com/SidSon05" target="_blank" rel="noreferrer" style={{ fontFamily: "'Courier New',monospace", fontSize: "0.85rem", letterSpacing: "0.1em", color: C.text, textDecoration: "none", transition: "color 0.3s", borderBottom: `1px solid ${C.border}` }} onMouseEnter={e => e.target.style.color = C.cyan} onMouseLeave={e => e.target.style.color = C.text}>GITHUB ↗</a>
                    <a href="https://linkedin.com/in/siddhisongire" target="_blank" rel="noreferrer" style={{ fontFamily: "'Courier New',monospace", fontSize: "0.85rem", letterSpacing: "0.1em", color: C.text, textDecoration: "none", transition: "color 0.3s", borderBottom: `1px solid ${C.border}` }} onMouseEnter={e => e.target.style.color = C.cyan} onMouseLeave={e => e.target.style.color = C.text}>LINKEDIN ↗</a>
                </div>
                <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", animation: "fadeUp 0.8s 1s ease both" }}>
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: C.muted }}>SCROLL</span>
                    <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom,${C.cyan},transparent)`, animation: "pulse 2s infinite" }} />
                </div>
            </div>
            <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes slideIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
        </section>
    );
}

// ─── Section Label ────────────────────────────────────────
function SectionLabel({ sub, title, italic }) {
    return (
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Courier New',monospace", fontSize: "0.68rem", letterSpacing: "0.35em", color: C.cyan, marginBottom: "0.75rem" }}>◈ {sub} ◈</p>
            <h2 style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {title}{" "}
                {italic && <span style={{ fontStyle: "italic", color: C.muted, fontWeight: 400, textTransform: "none", fontFamily: "'Georgia',serif", fontSize: "0.85em" }}>{italic}</span>}
            </h2>
        </div>
    );
}

// ─── About ────────────────────────────────────────────────
function About() {
    const [ref, inView] = useInView();
    return (
        <section id="about" ref={ref} style={{ padding: "8rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease" }}><SectionLabel sub="WHO I AM" title="About" italic="Me" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
                <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-40px)", transition: "all 0.8s ease" }}>
                    <p style={{ color: "#6aafd0", lineHeight: 1.9, marginBottom: "1rem", fontSize: "0.95rem" }}>
                        I'm an IT student at Ramrao Adik Institute of Technology with a minor in Data Science. I have a technical background in full-stack development, Python, Machine Learning, and Software Testing.
                    </p>
                    <p style={{ color: C.muted, lineHeight: 1.9, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
                        To obtain a position that will let me use my technical expertise and openness to learning. I have experience working as a Software Developer Intern actively participating in QA testing, integrating AI-driven suggestions, and building multi-stack applications.
                    </p>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        {[["4+", "Projects"], ["8.44", "CGPA"], ["1+", "Years"]].map(([val, label]) => (
                            <div key={label} style={{ position: "relative", paddingBottom: "1rem" }}>
                                <div style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontSize: "2.5rem", fontWeight: 900, color: "white", textShadow: `0 0 20px ${C.blue}70` }}>{val}</div>
                                <div style={{ fontFamily: "'Courier New',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: C.muted }}>{label.toUpperCase()}</div>
                                <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1, background: `linear-gradient(to right,${C.cyan},transparent)` }} />
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(40px)", transition: "all 0.8s 0.2s ease" }}>
                    <p style={{ fontFamily: "'Courier New',monospace", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.cyan, marginBottom: "1.5rem" }}>◈ TECHNICAL SKILLS</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                        {SKILLS.map((s, i) => (
                            <div key={s.name}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "0.78rem", color: C.text }}>{s.name}</span>
                                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "0.72rem", color: C.cyan }}>{s.level}%</span>
                                </div>
                                <div style={{ height: 3, background: "rgba(14,165,233,0.1)", overflow: "hidden" }}>
                                    <div style={{ height: "100%", background: `linear-gradient(90deg,${C.blue},${C.cyan})`, width: inView ? `${s.level}%` : "0%", transition: `width 1.2s ${0.3 + i * 0.1}s ease`, boxShadow: `0 0 10px ${C.cyan}70` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Experience ───────────────────────────────────────────
const EXPERIENCE = [
    {
        title: "Software Developer Intern",
        company: "Company Name",
        date: "202x - Present",
        desc: "Actively participated in QA testing, integrating AI-driven suggestions, and building multi-stack applications.",
        type: "Work"
    },
    {
        title: "B.Tech Information Technology",
        company: "Ramrao Adik Institute of Technology",
        date: "202x - 202x",
        desc: "Minor in Data Science. Consistent academic track record with an 8.44 CGPA. Participated in multiple software projects.",
        type: "Education"
    }
];

function Experience() {
    const [ref, inView] = useInView();
    return (
        <section id="experience" ref={ref} style={{ padding: "8rem 2rem", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
                <SectionLabel sub="MY JOURNEY" title="Experience" italic="& Education" />
            </div>
            <div style={{ position: "relative", marginTop: "4rem", paddingLeft: "2rem" }}>
                {/* Vertical Line */}
                <div style={{ position: "absolute", left: "5px", top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${C.cyan}80, transparent)` }} />
                
                {EXPERIENCE.map((exp, i) => (
                    <div key={i} style={{ position: "relative", paddingBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : `translateX(-30px)`, transition: `all 0.6s ${i * 0.2 + 0.2}s ease` }}>
                        {/* Marker */}
                        <div style={{ position: "absolute", left: "-2rem", top: "0.5rem", width: 12, height: 12, borderRadius: "50%", background: C.bg, border: `2px solid ${C.cyan}`, boxShadow: `0 0 15px ${C.cyan}`, zIndex: 2 }} />
                        <div style={{ position: "absolute", left: `calc(-2rem + 6px)`, top: "0.5rem", width: 40, height: 1, background: `${C.cyan}50`, zIndex: 1 }} />
                        
                        {/* Content */}
                        <div style={{ background: "rgba(4,15,32,0.6)", border: `1px solid ${C.border}`, padding: "2rem", position: "relative", marginLeft: "1rem", transition: "all 0.3s ease" }}
                             onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.cyan}80`; e.currentTarget.style.boxShadow = `0 0 20px ${C.cyan}15`; }}
                             onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>
                            <Brackets size={12} color={C.muted} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                                <div>
                                    <h3 style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", color: "white", margin: "0 0 0.3rem" }}>{exp.title}</h3>
                                    <h4 style={{ fontFamily: "'Courier New',monospace", fontSize: "0.85rem", color: C.cyan, margin: "0 0 1rem" }}>{exp.company}</h4>
                                </div>
                                <span style={{ fontFamily: "'Courier New',monospace", fontSize: "0.7rem", color: C.muted, border: `1px solid ${C.border}`, padding: "0.3rem 0.8rem", background: "rgba(14,165,233,0.05)" }}>{exp.date}</span>
                            </div>
                            <p style={{ fontSize: "0.85rem", color: "#6aafd0", lineHeight: 1.7, margin: 0 }}>{exp.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Projects ─────────────────────────────────────────────
function Projects() {
    const [ref, inView] = useInView();
    const [hovered, setHovered] = useState(null);
    return (
        <section id="projects" ref={ref} style={{ padding: "8rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
                <SectionLabel sub="WHAT I'VE BUILT" title="Featured" italic="Projects" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.5rem" }}>
                {PROJECTS.map((p, i) => (
                    <div key={p.title} onClick={() => p.link && window.open(p.link, "_blank")} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                        style={{ padding: "1.8rem", position: "relative", background: hovered === i ? "rgba(14,165,233,0.05)" : "rgba(4,15,32,0.9)", border: `1px solid ${hovered === i ? C.blue + "80" : C.border}`, cursor: p.link ? "pointer" : "default", transform: hovered === i ? "translateY(-5px)" : "none", boxShadow: hovered === i ? `0 10px 40px ${C.blue}18` : "none", transition: "all 0.35s ease", opacity: inView ? 1 : 0, animation: inView ? `slideIn 0.6s ${i * 0.1}s ease both` : "none" }}>
                        <Brackets size={12} color={hovered === i ? C.cyan : C.muted} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <span style={{ fontSize: "1.8rem" }}>{p.icon}</span>
                            <span style={{ fontFamily: "'Courier New',monospace", fontSize: "0.58rem", letterSpacing: "0.15em", color: hovered === i ? C.cyan : C.muted, border: `1px solid ${hovered === i ? C.cyan + "50" : C.muted + "30"}`, padding: "0.15rem 0.6rem" }}>{p.link ? "GITHUB ↗" : "PROJECT"}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontSize: "1.05rem", fontWeight: 900, marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.03em", color: hovered === i ? "white" : C.text }}>{p.title}</h3>
                        <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.desc}</p>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {p.tags.map(t => (
                                <span key={t} style={{ fontFamily: "'Courier New',monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: C.muted, background: "rgba(14,165,233,0.06)", padding: "0.2rem 0.6rem", border: `1px solid ${C.border}` }}>{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Contact ──────────────────────────────────────────────
function Contact() {
    const [ref, inView] = useInView();
    const [form, setForm] = useState({ name: "", email: "", msg: "" });
    const [sent, setSent] = useState(false);
    const handle = () => { setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", msg: "" }); };
    const iStyle = { background: "rgba(14,165,233,0.04)", border: `1px solid ${C.border}`, padding: "0.9rem 1.2rem", color: C.text, fontFamily: "'Courier New',monospace", fontSize: "0.82rem", outline: "none", transition: "border-color 0.3s", width: "100%", boxSizing: "border-box" };
    return (
        <section id="contact" ref={ref} style={{ padding: "8rem 2rem", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
                <SectionLabel sub="GET IN TOUCH" title="Let's" italic="work together" />
                <p style={{ color: C.muted, marginBottom: "3rem", lineHeight: 1.7, fontSize: "0.9rem" }}>Open for collaborations, freelance projects, and full-time opportunities.</p>
                <div style={{ position: "relative", padding: "2.5rem", border: `1px solid ${C.border}`, background: "rgba(4,15,32,0.7)" }}>
                    <Brackets size={18} color={C.cyan} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {[{ pl: "Your Name", k: "name" }, { pl: "your@email.com", k: "email" }].map(f => (
                            <input key={f.k} placeholder={f.pl} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={iStyle}
                                onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border} />
                        ))}
                        <textarea placeholder="Your message..." value={form.msg} rows={5} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} style={{ ...iStyle, resize: "vertical" }}
                            onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border} />
                        <button onClick={handle} style={{ padding: "1rem", background: sent ? `${C.cyan}15` : "transparent", color: C.cyan, border: `1px solid ${sent ? C.cyan : C.blue}`, fontFamily: "'Courier New',monospace", fontSize: "0.82rem", letterSpacing: "0.15em", cursor: "pointer", fontWeight: 700, boxShadow: sent ? `0 0 30px ${C.cyan}35` : `0 0 15px ${C.blue}15`, transition: "all 0.3s" }}
                            onMouseEnter={e => e.currentTarget.style.background = `${C.cyan}10`}
                            onMouseLeave={e => e.currentTarget.style.background = sent ? `${C.cyan}15` : "transparent"}
                        >{sent ? "✓ TRANSMISSION SENT" : "SEND MESSAGE →"}</button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2.5rem" }}>
                    <a href="https://github.com/SidSon05" target="_blank" rel="noreferrer" style={{ fontFamily: "'Courier New',monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cyan} onMouseLeave={e => e.target.style.color = C.muted}>GITHUB</a>
                    <a href="https://linkedin.com/in/siddhisongire" target="_blank" rel="noreferrer" style={{ fontFamily: "'Courier New',monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cyan} onMouseLeave={e => e.target.style.color = C.muted}>LINKEDIN</a>
                    <a href="mailto:siddhisongire2003@gmail.com" style={{ fontFamily: "'Courier New',monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cyan} onMouseLeave={e => e.target.style.color = C.muted}>EMAIL</a>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
    return (
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Courier New',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: "#0d2a40" }}>© 2026 — BUILT WITH PASSION & CODE ◈ DEV.PORTFOLIO</p>
        </footer>
    );
}

// ─── App ──────────────────────────────────────────────────
export default function Portfolio() {
    const [active, setActive] = useState("Home");
    useEffect(() => {
        const ids = ["home", "about", "experience", "projects", "contact"];
        const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }); }, { threshold: 0.4 });
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);
    return (
        <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
            <Cursor />
            <Navbar active={active} setActive={setActive} />
            <Hero />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <About />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <Experience />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <Projects />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <Contact />
            <Footer />
        </div>
    );
}
