import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleEmailClick = () => {
    const mailto = "mailto:areeshaabbas07@gmail.com";
    window.location.href = mailto;

    setTimeout(() => {
      window.open(
        "https://mail.google.com/mail/?view=cm&to=areeshaabbas07@gmail.com",
        "_blank"
      );
    }, 1000);
  };

  return (
    <section id="contact" className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Inquiry</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ready to integrate intelligence into your next project? Let's discuss your technical requirements.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch w-full"
        >
          <Button
            type="button"
            onClick={handleEmailClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow group px-8 py-6 rounded-full text-lg w-full sm:w-1/2"
          >
            <Mail className="w-5 h-5 mr-2" />
            Direct Email
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>

          <a
            href="https://www.linkedin.com/in/areesha-abbas"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2"
          >
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-glass-border hover:bg-secondary group px-8 py-6 rounded-full text-lg w-full"
            >
              <Linkedin className="w-5 h-5 mr-2 text-blue-500" />
              Technical Network
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;