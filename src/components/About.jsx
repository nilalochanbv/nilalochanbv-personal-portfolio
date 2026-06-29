import { motion } from "framer-motion";
import { User, Target, Cpu, Award } from "lucide-react";

export default function About() {
  const stories = [
    {
      num: "01",
      title: "Introduction",
      text: "I am a Computer Science [Specialization in Blockchain] student at Dr. N.G.P. Institute of Technology, Coimbatore. I am committed to developing innovative and efficient software solutions, eager to apply my diverse technical skill set to enhance productivity and growth.",
      icon: User,
      badgeClass: "badge-amber",
      cardClass: "story-card card-amber",
      glowClass: "card-glow",
      spanClass: "md:col-span-2",
    },
    {
      num: "02",
      title: "Areas of Interest",
      text: "My primary interests lie in Full Stack Development (MERN), Database Management Systems, Machine Learning, and UI / UX Design.",
      icon: Target,
      badgeClass: "badge-cyan",
      cardClass: "story-card card-cyan",
      glowClass: "card-glow",
      spanClass: "md:col-span-1",
    },
    {
      num: "03",
      title: "Current Focus",
      text: "Currently building web applications, machine learning models, and Gen AI solutions. Experienced in Python, Java, JavaScript, React.js, SQL, SQLite, and MongoDB.",
      icon: Cpu,
      badgeClass: "badge-violet",
      cardClass: "story-card card-violet",
      glowClass: "card-glow",
      spanClass: "md:col-span-1",
    },
    {
      num: "04",
      title: "Certifications",
      items: [
        "IBM SkillsBuild - Make Agentic AI Work for You (June 2026)",
        "Anthropic - AI Fluency: Framework & Foundations (June 2026)",
        "AWS - Fundamentals of Generative AI (June 2026)",
        "NPTEL - Introduction to Internet of Things (April 2026)",
        "Gen AI, LLM & Prototyping (June 2025)",
        "NPTEL - Cloud Computing (May 2025)"
      ],
      icon: Award,
      badgeClass: "badge-emerald",
      cardClass: "story-card card-emerald",
      glowClass: "card-glow",
      spanClass: "md:col-span-2",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-[#060713] flex flex-col justify-between relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Left Column: Heading and Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-28">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
              [ MY JOURNEY ]
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white uppercase leading-none">
              WHO AM I
            </h2>
          </div>

          {/* Premium Image Frame with Hover Zoom & Scroll Reveal */}
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] max-w-[360px] md:max-w-full rounded bg-neutral-900 border border-neutral-800 overflow-hidden group"
          >
            <motion.img
              src="/profile.png"
              alt="Nilalochan"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/50 tracking-widest uppercase">
              Nilalochan // Dev Profile Portrait
            </div>
          </motion.div>
        </div>

        {/* Right Column: Bento Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {stories.map((story, index) => {
            const IconComponent = story.icon;
            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col ${story.spanClass}`}
              >
                <div className={`p-6 md:p-8 rounded-2xl flex flex-col justify-between gap-6 relative shadow-xl h-full ${story.cardClass}`}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] card-accent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-700 card-glow" />
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] tracking-wider card-num transition-colors duration-300">
                        {story.num}
                      </span>
                      <h3 className="text-white font-display font-medium text-lg md:text-xl transition-colors card-title">
                        {story.title}
                      </h3>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 shrink-0 ${story.badgeClass}`}>
                      <IconComponent size={18} />
                    </div>
                  </div>

                  {story.items ? (
                    <ul className="text-neutral-400 font-sans font-light text-xs md:text-sm leading-relaxed z-10 flex flex-col gap-2 list-none">
                      {story.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-400 font-sans font-light text-sm leading-relaxed z-10">
                      {story.text}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright anchor */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>ABOUT // STORY LAB</span>
        <span>026 // © NILALOCHAN B V</span>
      </div>
    </section>
  );
}
