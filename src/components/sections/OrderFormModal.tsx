import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, Mail, Linkedin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const websiteGoalOptions = [
  { id: "personal", label: "Personal Brand / Portfolio" },
  { id: "ecommerce", label: "Digital Commerce" },
  { id: "ai-tool", label: "Custom AI Integration" },
  { id: "other", label: "Other Project Type" },
];

const OrderFormModal = ({ isOpen, onClose }: OrderFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    businessName: "",
    niche: "",
    websiteGoal: "",
    otherGoal: "",
    keyFeatures: "",
    specialRequests: "",
    referenceWebsite: "",
  });

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      whatsapp: "",
      businessName: "",
      niche: "",
      websiteGoal: "",
      otherGoal: "",
      keyFeatures: "",
      specialRequests: "",
      referenceWebsite: "",
    });
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("submit-order", {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          businessName: formData.businessName,
          niche: formData.niche,
          websiteGoal: formData.websiteGoal,
          websiteGoalOther: formData.otherGoal,
          keyFeatures: formData.keyFeatures,
          specialRequests: formData.specialRequests,
          referenceStyle: formData.referenceWebsite,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Request submitted",
        description: "I've sent a confirmation details to your inbox.",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission error",
        description: "I couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoalSelect = (goalId: string) => {
    setFormData(prev => ({ ...prev, websiteGoal: goalId }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Request Received!</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  I'm reviewing your project scope and will prepare a preview within <strong className="text-foreground">4–8 hours</strong>.
                </p>
                
                <div className="bg-secondary/30 rounded-xl p-5 mb-6 text-left max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground mb-3">
                    If you have immediate questions, reach out directly:
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="mailto:areeshaabbas07@gmail.com" 
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      areeshaabbas07@gmail.com
                    </a>
                    <a 
                      href="https://linkedin.com/in/areesha-abbas" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleClose} variant="outline" className="border-glass-border">
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      window.location.href = "/track-status";
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Check Project Status
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Project Scoping</h2>
                  <p className="text-muted-foreground text-sm">
                    Provide your technical requirements and I'll develop a preview for you to review.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80 border-b border-glass-border pb-2">
                      1. Contact Identity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Your Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-glass-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-glass-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp / Phone</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+00 000 000 000"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="bg-secondary/30 border-glass-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80 border-b border-glass-border pb-2">
                      2. Project Context
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Project Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="Brand or Business Name"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-glass-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="niche">Niche / Industry</Label>
                        <Input
                          id="niche"
                          name="niche"
                          placeholder="e.g., SaaS, Retail, Tech"
                          value={formData.niche}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-glass-border"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Primary Objective</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {websiteGoalOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleGoalSelect(option.id)}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                              formData.websiteGoal === option.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-glass-border bg-secondary/30 text-foreground hover:border-primary/50"
                            }`}
                          >
                            <span className="text-sm font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      {formData.websiteGoal === "other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 mt-3"
                        >
                          <Label htmlFor="otherGoal">Specify Objective</Label>
                          <Input
                            id="otherGoal"
                            name="otherGoal"
                            placeholder="Describe your primary goal"
                            value={formData.otherGoal}
                            onChange={handleChange}
                            required={formData.websiteGoal === "other"}
                            className="bg-secondary/30 border-glass-border"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80 border-b border-glass-border pb-2">
                      3. Technical Scope
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="keyFeatures">Desired Functionality</Label>
                      <Textarea
                        id="keyFeatures"
                        name="keyFeatures"
                        placeholder="List the essential features you need (e.g., API integrations, specific UI elements...)"
                        value={formData.keyFeatures}
                        onChange={handleChange}
                        required
                        className="bg-secondary/30 border-glass-border resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Additional Requirements</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any specific technical requests or unique needs?"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="bg-secondary/30 border-glass-border resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referenceWebsite">Design Reference / Style</Label>
                      <Input
                        id="referenceWebsite"
                        name="referenceWebsite"
                        placeholder="Link to a site you like or describe the aesthetic"
                        value={formData.referenceWebsite}
                        onChange={handleChange}
                        className="bg-secondary/30 border-glass-border"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.websiteGoal}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-glow py-6 text-lg font-medium rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Synchronizing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderFormModal;