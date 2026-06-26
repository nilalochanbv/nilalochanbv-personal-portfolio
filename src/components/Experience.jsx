import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";

const experienceData = [
  {
    type: "internship",
    icon: Briefcase,
    title: "Generative AI, LLM’s and Its Prototyping",
    company: "Gateway Software Solutions, Coimbatore (On-Site)",
    date: "Jun 2025",
    description: "Worked on fine-tuning large language models (LLMs) for domain-specific tasks such as summarization, Q&A, and chatbot development. Built and deployed prototypes demonstrating real-world applications of generative AI, such as content creation, code generation, and image captioning.",
  },
  {
    type: "internship",
    icon: Briefcase,
    title: "Web Development Intern",
    company: "CodSoft (Remote)",
    date: "2025",
    description: "Developed multiple responsive web projects using HTML, CSS, JavaScript. Gained hands-on experience in deploying projects using platforms like GitHub Pages.",
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  // Link scroll progress of section to timeline height scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-[#060713] flex flex-col justify-between relative overflow-hidden"
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-20">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ TIMELINE ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          EXPERIENCE RECORD
        </h2>
      </div>

      {/* Timeline core wrapper */}
      <div className="relative w-full max-w-5xl mx-auto py-10">
        {/* Background track line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-900/60 -translate-x-1/2" />

        {/* Animated Drawing Active Line */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 to-indigo-500 origin-top -translate-x-1/2 z-10"
        />

        {/* Experience nodes */}
        <div className="flex flex-col gap-16 md:gap-24">
          {experienceData.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const IconComponent = item.icon;

            return (
              <div
                key={item.title + idx}
                className="relative w-full flex flex-col md:flex-row justify-between items-start"
              >
                {/* Timeline Circle Bullet */}
                <div className="absolute left-4 md:left-1/2 top-1.5 w-8 h-8 rounded-full bg-[#060713] border border-violet-500/30 text-violet-400 -translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.08)]">
                  <IconComponent size={12} className="animate-pulse" />
                </div>

                {/* Left side spacing block or element card */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isLeft ? "md:text-right" : "md:order-last md:text-left"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="border border-neutral-900 hover:border-neutral-800 bg-neutral-950/40 p-6 md:p-8 rounded-xl flex flex-col gap-3 group transition-colors duration-300"
                  >
                    {/* Header info row */}
                    <div className={`flex items-center gap-2 font-mono text-[9px] text-neutral-500 tracking-wider uppercase ${isLeft ? "md:justify-end" : ""}`}>
                      <Calendar size={10} />
                      <span>{item.date}</span>
                    </div>

                    {/* Core headings */}
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-white font-display font-medium text-lg md:text-xl group-hover:text-neutral-200">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-neutral-400 tracking-wide">
                        {item.company}
                      </span>
                    </div>

                    {/* Detail content */}
                    <p className="text-neutral-400 font-sans font-light text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Mirror blank spacer for grid structure */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>TIMELINE // EXPERIENCE LAB</span>
        <span>026 // © NILALOCHAN B V</span>
      </div>
    </section>
  );
}
