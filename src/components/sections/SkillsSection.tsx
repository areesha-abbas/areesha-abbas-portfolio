import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Development",
    color: "from-cyan-500 to-blue-500",
    skills: [
      "Custom React Applications",
      "Dynamic Landing Pages",
      "Technical Portfolios",
      "Scalable Web Architecture"
    ]
  },
  {
    category: "UI & Experience",
    color: "from-teal-500 to-cyan-500",
    skills: [
      "Modular Design Systems",
      "Tailwind Architecture",
      "Advanced Interactions",
      "Responsive Interfaces"
    ]
  },
  {
    category: "AI Integration",
    color: "from-purple-500 to-pink-500",
    skills: [
      "Custom LLM Integration",
      "Intelligent Chat Systems",
      "AI Workflow Automation",
      "Prompt Engineering"
    ]
  },
  {
    category: "Delivery and Ecosystem",
    color: "from-orange-500 to-amber-500",
    skills: [
      "4–12 hour delivery",
      "Git-driven Workflows",
      "Live Deployment",
      "Iterative Development"
    ]
  }
];


const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Capabilities</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass-card p-6 hover-glow group"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${cat.color} text-white`}>
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                    className="px-3 py-2 rounded-lg bg-secondary/50 text-foreground text-sm font-medium border border-glass-border hover:bg-secondary transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;