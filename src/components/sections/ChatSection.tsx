import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
}

const ChatSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm Areesha. I specialize in building custom AI-integrated web applications. How can I help you with your technical requirements today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getReply = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
      return "My core stack involves React, TypeScript, and Tailwind CSS. For backend and automation, I utilize Supabase and custom LLM integrations to build intelligent systems.";
    }

    if (q.includes("project") || q.includes("portfolio")) {
      return "I engineer high-performance web solutions with a focus on AI automation. You can view my featured technical projects in the portfolio section above.";
    }

    if (q.includes("price") || q.includes("cost") || q.includes("budget")) {
      return "Project costs are determined by the technical scope and complexity of the integration. I focus on delivering high-value, scalable solutions tailored to your needs.";
    }

    if (q.includes("time") || q.includes("delivery") || q.includes("fast")) {
      return "I follow an iterative development process. For initial project scoping, I typically provide a functional staging preview within a few hours.";
    }

    if (q.includes("contact") || q.includes("hire") || q.includes("reach")) {
      return "You can initiate a professional inquiry through the contact section or by submitting a project scoping form. I look forward to discussing your architecture!";
    }

    return "That's an interesting technical requirement. I'm happy to discuss my engineering process, stack preferences, or specific AI integration capabilities.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: getReply(userMessage.content)
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="chat" className="py-32 px-4 relative">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            <span>
              Technical <span className="text-gradient">Interface</span>
            </span>
          </h2>
          <p className="text-muted-foreground">
            Interact with my custom logic interface to learn more about my development workflow.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card overflow-hidden glow-border"
        >
          <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary to-accent text-white"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`max-w-[75%] p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-secondary p-4 rounded-2xl rounded-bl-md text-sm italic text-muted-foreground">
                  Processing…
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-glass-border bg-secondary/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Inquire about stack, pricing, or architecture..."
                className="flex-1 bg-background/50 border-glass-border focus-visible:ring-primary"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatSection;