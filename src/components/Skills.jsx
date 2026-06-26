import { motion } from "framer-motion";
import { Code, Globe, Database, Layers, Users } from "lucide-react";

const iconMap = {
  code: { icon: Code, colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.06)]" },
  globe: { icon: Globe, colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.06)]" },
  database: { icon: Database, colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.06)]" },
  layers: { icon: Layers, colorClass: "text-violet-400 bg-violet-500/10 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.06)]" },
  users: { icon: Users, colorClass: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.06)]" },
};

const cardColors = [
  "card-amber",
  "card-cyan",
  "card-emerald",
  "card-violet",
  "card-rose"
];

const skillsCategories = [
  {
    title: "LANGUAGES",
    icon: "code",
    description: "Core programming languages for backend logic, scripting, and system algorithms.",
    skills: [
      { name: "Java", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "C", level: "Basics" },
    ],
  },
  {
    title: "WEB & SCRIPTING",
    icon: "globe",
    description: "Modern scripting libraries and frameworks for building responsive user interfaces.",
    skills: [
      { name: "JavaScript", level: "Advanced" },
      { name: "React.js", level: "Intermediate" },
      { name: "HTML", level: "Expert" },
      { name: "CSS", level: "Expert" },
    ],
  },
  {
    title: "DATABASES",
    icon: "database",
    description: "Structured and unstructured database management systems for reliable persistence.",
    skills: [
      { name: "SQL", level: "Intermediate" },
      { name: "SQLite", level: "Intermediate" },
      { name: "MongoDB", level: "Basics" },
    ],
  },
  {
    title: "AREAS OF INTEREST",
    icon: "layers",
    description: "Key technology sub-fields and domains of active practice and design.",
    skills: [
      { name: "Full Stack (MERN)", level: "Active" },
      { name: "Database Systems", level: "Active" },
      { name: "Machine Learning", level: "Active" },
      { name: "UI / UX Design", level: "Active" },
    ],
  },
  {
    title: "SOFT SKILLS",
    icon: "users",
    description: "Interpersonal qualities enabling effective collaboration and communication.",
    skills: [
      { name: "Teamwork" },
      { name: "Leadership" },
      { name: "Time Management" },
      { name: "Critical Thinking" },
      { name: "Effective Communication" },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-[#060713] flex flex-col justify-between relative"
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ CAPABILITIES ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          TECHNICAL STACK
        </h2>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full flex-1"
      >
        {skillsCategories.map((cat, idx) => {
          const colorClass = cardColors[idx];
          return (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`story-card group p-8 rounded-2xl flex flex-col justify-between relative shadow-xl ${colorClass} ${
                idx === 3 ? "md:col-span-2 lg:col-span-1" : ""
              } ${idx === 4 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] card-accent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-700 card-glow" />
              
              <div className="flex flex-col gap-4">
                {/* Category Header */}
                <div className="flex justify-between items-center border-b pb-3 card-footer">
                  <div className="flex items-center gap-3">
                    {iconMap[cat.icon] && (
                      <div className={`p-2 rounded-lg border ${iconMap[cat.icon].colorClass}`}>
                        {(() => {
                          const Icon = iconMap[cat.icon].icon;
                          return <Icon size={16} />;
                        })()}
                      </div>
                    )}
                    <h3 className="font-display font-semibold text-lg text-white tracking-wider card-title transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] tracking-widest uppercase card-num transition-colors">
                    // Cat {idx + 1}
                  </span>
                </div>

                {/* Description */}
                <p className="text-neutral-500 font-sans font-light text-xs leading-relaxed mb-4 group-hover:text-neutral-400 transition-colors z-10">
                  {cat.description}
                </p>

                {/* Skills Tags List */}
                <div className="flex flex-wrap gap-2.5 z-10">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 skill-tag"
                    >
                      <span className="text-white text-xs font-mono tracking-wide">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 origin-right skill-tag-level">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom visual indicator tag */}
              <div className="border-t pt-4 mt-6 flex justify-between items-center card-footer">
                <span className="font-mono text-[9px] text-neutral-700 uppercase tracking-widest">
                  System Registry
                </span>
                <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 card-dot" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>SKILLS // PHYSICS WEB</span>
        <span>026 // © NILALOCHAN B V</span>
      </div>
    </section>
  );
}
