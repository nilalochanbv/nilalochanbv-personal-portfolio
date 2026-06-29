import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sprout, CheckSquare, ShieldAlert, Link } from "lucide-react";

// Custom Github brand icon
const Github = ({ size = 16, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectVisuals = {
  scanner: { icon: Sprout, colorClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.06)]" },
  validator: { icon: CheckSquare, colorClass: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.06)]" },
  keylogger: { icon: ShieldAlert, colorClass: "text-amber-400 border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.06)]" },
  link: { icon: Link, colorClass: "text-violet-400 border-violet-500/20 bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.06)]" },
};

const techColors = {
  // Python & AI
  "Python": "text-amber-400 border-amber-500/15 bg-amber-500/[0.02] hover:border-amber-500/30 hover:bg-amber-500/[0.05] hover:text-amber-300",
  "OpenCV": "text-emerald-400 border-emerald-500/15 bg-emerald-500/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] hover:text-emerald-300",
  "TensorFlow": "text-rose-400 border-rose-500/15 bg-rose-500/[0.02] hover:border-rose-500/30 hover:bg-rose-500/[0.05] hover:text-rose-300",
  "Gemini AI": "text-violet-400 border-violet-500/15 bg-violet-500/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-violet-300",
  
  // Java & Web
  "Java": "text-rose-400 border-rose-500/15 bg-rose-500/[0.02] hover:border-rose-500/30 hover:bg-rose-500/[0.05] hover:text-rose-300",
  "LLM APIs": "text-violet-400 border-violet-500/15 bg-violet-500/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-violet-300",
  "Prompt Engineering": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
  "Fast API": "text-emerald-400 border-emerald-500/15 bg-emerald-500/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] hover:text-emerald-300",
  "Multi-dialect SQL": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
  "Multilingual language": "text-violet-400 border-violet-500/15 bg-violet-500/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-violet-300",
  
  // TypeScript Stack
  "TypeScript": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
  "React": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
  "Express": "text-neutral-400 border-neutral-800 bg-neutral-900/[0.02] hover:border-neutral-600 hover:text-neutral-200",
  "PostgreSQL": "text-violet-400 border-violet-500/15 bg-violet-500/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-violet-300",
  
  // Security & Tools
  "Windows API": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
  "SIEM/EDR Tools": "text-rose-400 border-rose-500/15 bg-rose-500/[0.02] hover:border-rose-500/30 hover:bg-rose-500/[0.05] hover:text-rose-300",
  "SQLite": "text-violet-400 border-violet-500/15 bg-violet-500/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-violet-300",
  "HTML/CSS/JS": "text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:text-cyan-300",
};

const getTechColor = (tech) => techColors[tech] || "text-neutral-400 border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:text-white";

const projectsData = [
  {
    id: 1,
    num: "01",
    name: "DialectDB - Multilingual Text-to-SQL Pipeline",
    tagline: "Multilingual Text-to-SQL Agent Pipeline",
    description: "Building an AI agent that evaluates a beginner’s problem solving logic written in plain text, without an actual code solution. Utilizes LLM-based orchestration for access correctness, provides targeted hints, and guides learners through reasoning steps autonomously.",
    tech: ["Python", "React", "Fast API", "Multi-dialect SQL", "Multilingual language"],
    github: "https://github.com/nilalochanbv",
    live: "https://github.com/nilalochanbv",
    visual: "validator",
    readmeDetails: {
      features: [
        "Logic Evaluation: Evaluates plain text pseudocode and problem solving logic without needing code execution.",
        "Adaptive Prompting: Provides contextual clues and targets logic errors step-by-step using LLM agent helpers.",
        "Multi-dialect Translation: Maps logical constructs to complex SQL queries across different database dialects."
      ],
      architecture: "Orchestrated using a React frontend, Python FastAPI logic validation controller, and Gemini AI agent pipelines."
    }
  },
  {
    id: 2,
    num: "02",
    name: "Code Logic Validator",
    tagline: "AI Orchestration Logic Evaluation Engine",
    description: "Building an AI agent that evaluates a beginner's problem solving logic written in plain text, without an actual code solution. Utilizes LLM-based orchestration for access correctness, provides targeted hints, and guides learners through reasoning steps autonomously.",
    tech: ["Java", "LLM APIs", "Prompt Engineering"],
    github: "https://github.com/nilalochanbv",
    live: "https://github.com/nilalochanbv",
    visual: "validator",
    readmeDetails: {
      features: [
        "Natural Language Evaluator: Evaluates pseudocode and logic sentences directly using LLM evaluation models.",
        "Adaptive Hinting System: Generates localized suggestions to help learners correct logic errors step-by-step.",
        "Automated Cognitive Mapping: Diagnoses specific concept deficiencies to recommend learning paths."
      ],
      architecture: "Engineered using Java (Spring Boot) and integrated with LLM reasoning agents via Prompt Engineering to evaluate abstract problem-solving logic."
    }
  },
  {
    id: 3,
    num: "03",
    name: "AI Powered Leaf Disease Detection and Smart Advisory System",
    tagline: "ML/CV Plant Disease Classification",
    description: "Developed a plant disease scanning application leveraging custom YOLO and DenseNet classification models. Features an advanced Multilingual AI Smart Advisory engine utilizing Google Gemini to automatically translate specialized diagnosis reports and preventive guides into 12 native regional languages.",
    tech: ["Python", "OpenCV", "TensorFlow", "Gemini AI"],
    github: "https://github.com/nilalochanbv/Smart-Leaf-Scanner-and-AI-Advisory-System-using-Gemini-Ai",
    live: "https://github.com/nilalochanbv/Smart-Leaf-Scanner-and-AI-Advisory-System-using-Gemini-Ai",
    visual: "scanner",
    readmeDetails: {
      features: [
        "Leaf Detection: Employs a custom YOLO model to locate and bounding-box leaves in uploaded images.",
        "Disease Classification: Analyzes leaves using a custom DenseNet121 model trained on 37 plant-disease categories.",
        "Multilingual AI Advisory: Integrates Google Gemini AI to supply specialized educational recommendations in 12 languages.",
        "Interactive Web Interface: Streamlit-based web application providing immediate visual feedback."
      ],
      architecture: "Separated into a computer vision pipeline for leaf localization, a deep learning classification engine, and an LLM advisory controller orchestrated via a lightweight Streamlit backend."
    }
  },
  {
    id: 4,
    num: "04",
    name: "Nano Link",
    tagline: "High-Performance URL Shortener Service",
    description: "A fast, lightweight URL shortener service that transforms long URLs into clean, compact links. Implemented Prisma ORM, PostgreSQL database indexing, JWT authentication, and Zod input validation.",
    tech: ["TypeScript", "React", "Express", "PostgreSQL"],
    github: "https://github.com/nilalochanbv/nano-link",
    live: "https://github.com/nilalochanbv/nano-link",
    visual: "link",
    readmeDetails: {
      features: [
        "Redirection Engine: Custom endpoint routing optimized for rapid visitor redirection and link processing.",
        "Secure User Authentication: Secure JWT implementation featuring HttpOnly refresh token rotation protocols.",
        "Analytics Dashboard: SVG graphs rendering visitor device distribution, geographic stats, and access timeline.",
        "Dynamic Tools: Automatic QR code generator and batch CSV stream uploads for bulk links."
      ],
      architecture: "Full-Stack Node.js architecture separating direct queries (Prisma ORM & PostgreSQL) from controllers and services, while using React Query and Recharts on Vite for a responsive dashboard."
    }
  },
  {
    id: 5,
    num: "05",
    name: "Contextkey Logging",
    tagline: "Keystroke Logging vulnerability simulator",
    description: "Simulated keylogging techniques in controlled environments to identify vulnerabilities. Designed detection and mitigation strategies using SIEM and EDR tools.",
    tech: ["Python", "Windows API", "SIEM/EDR Tools"],
    github: "https://github.com/nilalochanbv",
    live: "https://github.com/nilalochanbv",
    visual: "keylogger",
    readmeDetails: {
      features: [
        "Active Hooking: Accesses Windows API hook bindings using ctypes for window capture verification.",
        "Context Tracking: Monitors chrome.exe, vscode.exe, and target applications to log typing boundaries.",
        "Vulnerability Evaluation: Demonstrates mitigation rules using custom SIEM configurations and EDR analysis."
      ],
      architecture: "Python security pipeline using Windows API hooks for input monitoring and exporting telemetry details to SIEM diagnostic tools."
    }
  }
];

const leafScannerSlides = [
  {
    image: "/leaf_demo_1.png",
    title: "1. Leaf Upload Portal",
    desc: "A clean, intuitive interface that supports drag-and-drop uploads for fast plant analysis."
  },
  {
    image: "/leaf_demo_2.png",
    title: "2. YOLO Leaf Detection",
    desc: "A custom YOLO bounding-box model isolates the leaf region in real time, filtering out background noise."
  },
  {
    image: "/leaf_demo_3.png",
    title: "3. DenseNet Classification",
    desc: "Deep learning DenseNet121 model analyzes features to classify 37 categories, detecting Apple Black Rot with 96.8% confidence."
  },
  {
    image: "/leaf_demo_4.png",
    title: "4. Multilingual AI Advisory",
    desc: "Integrates Google Gemini AI to instantly generate comprehensive, multilingual treatment advice and preventative steps."
  },
  {
    image: "/leaf_demo_5.png",
    title: "5. Localized Treatments in 12 Languages",
    desc: "Enables farmers to translate recommendations immediately into 12 regional languages (English, Tamil, Hindi, etc.) for accessibility."
  }
];

function LeafScannerDemo() {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % leafScannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = leafScannerSlides[slideIdx];

  return (
    <motion.div
      key="scanner-demo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col justify-between p-6 bg-black font-sans"
    >
      {/* Top Bar decoration */}
      <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-display font-medium text-[10px] text-white tracking-wider uppercase">
            MULTILINGUAL AI ADVISORY
          </span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500">
          Step {slideIdx + 1} / 5
        </span>
      </div>

      {/* Slide Image with Smooth Cross-fade */}
      <div className="flex-1 relative w-full rounded overflow-hidden border border-neutral-900 bg-neutral-950/20 flex items-center justify-center group/slide my-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={slideIdx}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {/* Hover overlay navigator buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-2 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSlideIdx((prev) => (prev - 1 + leafScannerSlides.length) % leafScannerSlides.length);
            }}
            className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/90 text-white flex items-center justify-center pointer-events-auto hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSlideIdx((prev) => (prev + 1) % leafScannerSlides.length);
            }}
            className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/90 text-white flex items-center justify-center pointer-events-auto hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide Text Description */}
      <div className="flex flex-col gap-1 min-h-[50px] border-t border-neutral-900 pt-3">
        <h4 className="font-display font-semibold text-[11px] text-emerald-400 uppercase tracking-wider">
          {current.title}
        </h4>
        <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* Indicator progress bars */}
      <div className="flex gap-1.5 w-full mt-2">
        {leafScannerSlides.map((_, sIdx) => {
          const isActive = sIdx === slideIdx;
          return (
            <div
              key={sIdx}
              onClick={(e) => {
                e.stopPropagation();
                setSlideIdx(sIdx);
              }}
              className="flex-1 h-1 rounded-full bg-neutral-900 overflow-hidden cursor-pointer relative"
            >
              {isActive && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute top-0 bottom-0 left-0 bg-emerald-500"
                />
              )}
              {!isActive && sIdx < slideIdx && (
                <div className="absolute inset-0 bg-neutral-700" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

const nanoLinkSlides = [
  {
    image: "/link_demo_1.png",
    title: "1. Premium SaaS Landing Page",
    desc: "A sleek landing page highlighting connections made simple and links made powerful, with responsive typography and theme toggling."
  },
  {
    image: "/link_demo_2.png",
    title: "2. Shorten Links Instantly",
    desc: "A custom modal overlay that lets authenticated users input long destination URLs and configure custom alias shortcodes."
  },
  {
    image: "/link_demo_3.png",
    title: "3. Interactive User Dashboard",
    desc: "Track links status and aggregated analytics. Shows original destinations, shortened paths, and total redirections in a table."
  },
  {
    image: "/link_demo_4.png",
    title: "4. Dynamic QR Code Generator",
    desc: "Generates custom high-contrast QR codes for any shortened link, supporting instant downloads as PNG images."
  },
  {
    image: "/link_demo_5.png",
    title: "5. Production Database Integration",
    desc: "Data models queried through Prisma ORM are synchronized with a high-performance PostgreSQL user and redirection schema."
  }
];

function NanoLinkDemo() {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % nanoLinkSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = nanoLinkSlides[slideIdx];

  return (
    <motion.div
      key="link-demo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col justify-between p-6 bg-black font-sans"
    >
      {/* Top Bar decoration */}
      <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="font-display font-medium text-[10px] text-white tracking-wider uppercase">
            NANO LINK URL ENGINE
          </span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500">
          Step {slideIdx + 1} / 5
        </span>
      </div>

      {/* Slide Image with Smooth Cross-fade */}
      <div className="flex-1 relative w-full rounded overflow-hidden border border-neutral-900 bg-neutral-950/20 flex items-center justify-center group/slide my-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={slideIdx}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {/* Hover overlay navigator buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-2 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSlideIdx((prev) => (prev - 1 + nanoLinkSlides.length) % nanoLinkSlides.length);
            }}
            className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/90 text-white flex items-center justify-center pointer-events-auto hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSlideIdx((prev) => (prev + 1) % nanoLinkSlides.length);
            }}
            className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/90 text-white flex items-center justify-center pointer-events-auto hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide Text Description */}
      <div className="flex flex-col gap-1 min-h-[50px] border-t border-neutral-900 pt-3">
        <h4 className="font-display font-semibold text-[11px] text-violet-400 uppercase tracking-wider">
          {current.title}
        </h4>
        <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* Indicator progress bars */}
      <div className="flex gap-1.5 w-full mt-2">
        {nanoLinkSlides.map((_, sIdx) => {
          const isActive = sIdx === slideIdx;
          return (
            <div
              key={sIdx}
              onClick={(e) => {
                e.stopPropagation();
                setSlideIdx(sIdx);
              }}
              className="flex-1 h-1 rounded-full bg-neutral-900 overflow-hidden cursor-pointer relative"
            >
              {isActive && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute top-0 bottom-0 left-0 bg-violet-500"
                />
              )}
              {!isActive && sIdx < slideIdx && (
                <div className="absolute inset-0 bg-neutral-700" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ValidatorPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-black font-sans min-h-[280px]">
      <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-display font-medium text-[10px] text-white tracking-wider uppercase">
            AGENT LOGIC COGNITION
          </span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500">// active</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-3 my-4 font-mono text-[10px] text-neutral-500">
        <div className="flex justify-between">
          <span>Prompt Orchestration:</span>
          <span className="text-white">SIH-Ed-System-v2</span>
        </div>
        <div className="flex justify-between">
          <span>Cognitive Parser:</span>
          <span className="text-neutral-300">LLM_API_ROUTING</span>
        </div>
        <div className="p-3 border border-neutral-900 bg-neutral-950 rounded text-neutral-400 text-[9px] leading-normal text-left">
          <p className="text-green-400 font-bold">// USER INPUT SENTENCE:</p>
          <p>"I want to find prime numbers using a sieve."</p>
          <p className="text-white mt-1.5">// TARGETED AGENT HINT GENERATED:</p>
          <p>"Try initializing a boolean array of size N..."</p>
        </div>
      </div>

      <div className="border-t border-neutral-900 pt-3 flex justify-between items-center">
        <span className="font-mono text-[8px] text-neutral-600 uppercase">Diagnostics Ready</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
      </div>
    </div>
  );
}

function KeyloggerPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-black font-sans min-h-[280px]">
      <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-display font-medium text-[10px] text-white tracking-wider uppercase">
            WINDOWS KERNEL AUDIT
          </span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500">// active</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-3 my-4 font-mono text-[10px] text-neutral-500">
        <div className="flex justify-between">
          <span>Active Hook:</span>
          <span className="text-white">chrome.exe</span>
        </div>
        <div className="flex justify-between">
          <span>Buffer:</span>
          <span className="text-neutral-300">ctypes.wintypes</span>
        </div>
        <div className="p-3 border border-neutral-900 bg-neutral-950 rounded text-neutral-400 text-[8px] leading-relaxed text-left max-h-[80px] overflow-hidden">
          <p>[22:42:01] Hook Focus: vscode.exe</p>
          <p>[22:42:04] Keys: import sys\n</p>
          <p>[22:42:09] Hook Focus: chrome.exe</p>
          <p>[22:42:15] Keys: github.com</p>
        </div>
      </div>

      <div className="border-t border-neutral-900 pt-3 flex justify-between items-center">
        <span className="font-mono text-[8px] text-neutral-600 uppercase">Simulation Logs</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  // 3D perspective mouse hover tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate relative mouse coordinates (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / width - 0.5;
    const relY = (e.clientY - rect.top) / height - 0.5;
    
    // Scale for gentle tilt intensity
    setTilt({
      x: relX * 20, // max 10 deg tilt
      y: -relY * 20,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-[#060713] flex flex-col justify-between relative"
    >
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ SELECTED WORKS ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          PROJECT CASE STUDIES
        </h2>
      </div>

      {/* Main project list */}
      <div className="flex flex-col w-full">
        {projectsData.map((project, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveIdx(idx)}
              className="border-b border-neutral-900 py-8 first:border-t relative group"
            >
              {/* Visual indicator slide overlay */}
              <div className="absolute inset-0 bg-neutral-950/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out -z-10" />

              <div className="flex justify-between items-start gap-4">
                {/* Number & Name block */}
                <div className="flex gap-4 md:gap-6 items-start">
                  <span className="font-mono text-xs text-neutral-600 pt-2.5">
                    {project.num}
                  </span>
                  {projectVisuals[project.visual] && (
                    <div className={`p-2.5 rounded-xl border mt-1 shrink-0 ${projectVisuals[project.visual].colorClass}`}>
                      {(() => {
                        const Icon = projectVisuals[project.visual].icon;
                        return <Icon size={18} />;
                      })()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-4xl font-display font-medium text-white transition-colors duration-300 group-hover:text-neutral-200">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 tracking-wide mt-1">
                      {project.tagline}
                    </span>
                  </div>
                </div>

                {/* Desktop active caret or arrow */}
                <div className="hidden md:block">
                  <motion.div
                    animate={{
                      x: isActive ? 4 : 0,
                      opacity: isActive ? 1 : 0.2,
                      scale: isActive ? 1.1 : 1,
                    }}
                    className="text-white"
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </div>

              {/* Expanding details grid: reveals on hover, always open on mobile */}
              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : "0px",
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 md:pl-10">
                  {/* Left Column of details */}
                  <div className="lg:col-span-7 flex flex-col gap-5 pr-4">
                    <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-xl font-sans mt-2">
                      {project.description}
                    </p>

                    {/* Styled Collapsible Spec sheet / README Details */}
                    {project.readmeDetails && (
                      <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/60 flex flex-col gap-3 font-sans max-w-xl text-left">
                        <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                            README.md // SYSTEM DETAILS
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-3 text-xs leading-relaxed font-sans text-neutral-400">
                          <div>
                            <strong className="text-neutral-200 block font-medium mb-1 font-display text-[10px] uppercase tracking-wider">
                              Key Features & Capabilities:
                            </strong>
                            <ul className="list-disc list-inside pl-1 flex flex-col gap-1 text-[11px]">
                              {project.readmeDetails.features.map((f, fIdx) => (
                                <li key={fIdx}>{f}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <strong className="text-neutral-200 block font-medium mb-1 font-display text-[10px] uppercase tracking-wider">
                              Technical Architecture:
                            </strong>
                            <p className="font-light text-[11px]">
                              {project.readmeDetails.architecture}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`font-mono text-[10px] tracking-wider px-3 py-1 rounded-full transition-all duration-300 cursor-default ${getTechColor(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 font-mono text-[10px] tracking-widest text-neutral-400 mt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <Github size={12} />
                        <span>GITHUB</span>
                      </a>
                      <span>/</span>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>LIVE DEMO</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column of details: Dedicated aligned preview container */}
                  <div className="hidden lg:block lg:col-span-5 w-full relative">
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 3,
                        rotateY: -3,
                        transition: { duration: 0.3 }
                      }}
                      className="w-full aspect-[4/3] relative rounded-xl border border-neutral-800 bg-neutral-950/40 p-1 flex items-center justify-center shadow-2xl shadow-black overflow-hidden min-h-[300px]"
                      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                      {project.id === 1 && <LeafScannerDemo />}
                      {project.id === 2 && <ValidatorPreview />}
                      {project.id === 3 && <NanoLinkDemo />}
                      {project.id === 4 && <KeyloggerPreview />}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>PROJECTS // WORKS LAB</span>
        <span>026 // © NILALOCHAN B V</span>
      </div>
    </section>
  );
}
