import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, BookOpen, GraduationCap } from "lucide-react";

function CGPACounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0.0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0.0;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + easeOutCubic * (value - startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-semibold tabular-nums text-white">
      {count.toFixed(1)}
    </span>
  );
}

export default function Education() {
  const radius = 54;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (8.0 / 10.0) * circumference;

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="education"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-[#060713] flex flex-col justify-between relative overflow-hidden"
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-20">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ ACADEMICS ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          EDUCATION CREDENTIALS
        </h2>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full flex-1">
        {/* Left Column: Academic Timeline */}
        <motion.div
          variants={leftPanelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 flex flex-col relative pl-12 border-l border-neutral-800/80 gap-12"
        >
          {/* Timeline Node 1: College */}
          <motion.div variants={timelineItemVariants} className="relative flex flex-col gap-2 group">
            {/* Timeline bullet dot */}
            <div className="absolute -left-[64px] top-1.5 w-8 h-8 rounded-full bg-[#060713] border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_rgba(6,182,212,0.08)]">
              <GraduationCap size={12} className="animate-pulse" />
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-500 tracking-wider uppercase">
              <Calendar size={10} />
              <span>Sep 2023 – Apr 2027</span>
              <span className="text-neutral-700">//</span>
              <span className="text-white bg-neutral-900 px-2 py-0.5 rounded">Active</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wide group-hover:text-neutral-200 transition-colors">
              B.E  COMPUTER SCIENCE & ENGINEERING [Specialization in Blockchain]
            </h3>

            <p className="text-neutral-400 font-mono text-sm">
              Dr. N.G.P. Institute of Technology, Coimbatore
            </p>

            <div className="font-mono text-xs text-neutral-300 mt-1 flex items-center gap-2">
              <span>Grade: 8.0/10.0 (till 5th semester)</span>
            </div>

            <span className="text-xs text-neutral-500 font-sans font-light mt-1 max-w-lg">
              Focusing on core software engineering principles, algorithms design, system architecture, database management systems, and modern AI pipelines.
            </span>
          </motion.div>

          {/* Timeline Node 2: School */}
          <motion.div variants={timelineItemVariants} className="relative flex flex-col gap-2 group">
            {/* Timeline bullet dot */}
            <div className="absolute -left-[64px] top-1.5 w-8 h-8 rounded-full bg-[#060713] border border-neutral-800 text-neutral-400 flex items-center justify-center group-hover:border-white group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.02)]">
              <BookOpen size={12} />
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-500 tracking-wider uppercase">
              <Calendar size={10} />
              <span>Completed 2023</span>
            </div>

            <h3 className="text-xl md:text-2xl font-display font-bold text-neutral-400 uppercase tracking-wide group-hover:text-white transition-colors">
              Higher Secondary Education
            </h3>

            <p className="text-neutral-500 font-mono text-sm">
              Victory Vidhyalaya Matric Higher Secondary School, Coimbatore
            </p>

            <span className="text-xs text-neutral-600 font-sans font-light mt-1 max-w-lg">
              Completed matriculation studies with advanced coursework in mathematics, physics, chemistry, and computer science.
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Glowing Circular CGPA Display */}
        <div className="lg:col-span-5 flex justify-center items-center w-full relative min-h-[300px]">
          {/* Faint backdrop label */}
          <div className="absolute font-display font-bold text-[8rem] md:text-[11rem] text-neutral-950 select-none tracking-tighter -z-10">
            CGPA
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border border-neutral-900 bg-neutral-950/40 p-8 rounded-2xl flex flex-col items-center gap-6 max-w-xs w-full relative shadow-2xl group hover:border-neutral-800 transition-colors duration-300"
          >
            {/* Custom SVG Circular Progress Ring */}
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background track circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-neutral-900 fill-transparent"
                  strokeWidth={strokeWidth}
                />
                {/* Active circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-white fill-transparent"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: strokeDashoffset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
                />
              </svg>

              {/* Inner score detail */}
              <div className="absolute flex flex-col items-center justify-center">
                <div className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-white">
                  <CGPACounter value={8.0} />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">
                  out of 10.0
                </span>
              </div>
            </div>

            <div className="w-full border-t border-neutral-900 pt-4 flex flex-col gap-1.5 font-mono text-[9px] text-neutral-500">
              <div className="flex justify-between">
                <span>Academic Record:</span>
                <span className="text-white font-semibold">8/10 (till 5th sem)</span>
              </div>
              <div className="flex justify-between">
                <span>No. of Backlogs:</span>
                <span className="text-green-500 uppercase tracking-wider font-semibold">None</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>ACADEMICS // EDUCATION LAB</span>
        <span>026 // © NILALOCHAN B V</span>
      </div>
    </section>
  );
}
