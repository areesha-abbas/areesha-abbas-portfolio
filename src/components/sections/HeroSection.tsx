import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Brain, Eye, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderFormModal from "./OrderFormModal";

const processSteps = [
  { icon: FileText, label: "Define Scope", description: "Technical briefing" },
  { icon: Brain, label: "Engineer", description: "System architecture" },
  { icon: Eye, label: "Review", description: "Live staging preview" },
  { icon: CheckCircle, label: "Deploy", description: "Production launch" },
];

const HeroSection = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      {/* Background stays functional and clean */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-glass-border text-sm text-muted-foreground mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Systems · Fast Delivery · Low Budget
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-foreground">Areesha</span>{" "}
          <span className="text-gradient">Abbas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto"
        >
          Engineering Intelligent Web Experiences — Automation, and AI Integration that helps Generate Leads, and Save Time
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-xl mx-auto"
        >
          Bridging the gap between modern design and machine intelligence. Review your technical preview before final commitment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-10"
        >
          <Button
            onClick={() => setIsOrderFormOpen(true)}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow text-lg md:text-xl px-10 py-7 rounded-full font-semibold shadow-lg shadow-primary/25"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Initiate Project Scoping
          </Button>
        </motion.div>
          <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}

          className="mb-10"

        >

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent-foreground">
            💰 Starting from as low as <strong className="text-primary">$15</strong> depending on complexity
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6 font-medium">Development Workflow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {processSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{step.label}</span>
                    <span className="text-xs text-muted-foreground">{step.description}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground/50 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        >
          <Button
            onClick={scrollToChat}
            variant="outline"
            size="lg"
            className="border-glass-border hover:bg-secondary/50 text-base px-6 py-5 rounded-full"
          >
            Interact with my AI Interface
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </div>

      <OrderFormModal isOpen={isOrderFormOpen} onClose={() => setIsOrderFormOpen(false)} />
    </section>
  );
};

export default HeroSection;