import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Loader2,
  Activity,
  Clock,
  CheckCircle,
  Eye,
  XCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProjectInquiry {
  id: string;
  business_name: string;
  website_goal: string;
  website_goal_other: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Reviewing",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: <Clock className="w-4 h-4" />,
  },
  "in-progress": {
    label: "In Development",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
  },
  "preview-sent": {
    label: "Ready for Review",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: <Eye className="w-4 h-4" />,
  },
  completed: {
    label: "Live & Deployed",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: "Archived",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: <XCircle className="w-4 h-4" />,
  },
};

const TrackOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke("track-order", {
        body: { email: email.trim() },
      });

      if (error) throw error;

      setInquiries(data.orders || []);

      if (data.orders?.length === 0) {
        toast({
          title: "Status update",
          description: "I couldn't find any inquiries associated with that email.",
        });
      }
    } catch (error: any) {
      console.error("Error tracking inquiry:", error);
      toast({
        title: "Connection issue",
        description: "I was unable to retrieve your project details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGoalText = (inquiry: ProjectInquiry) => {
    if (inquiry.website_goal === "other" && inquiry.website_goal_other) {
      return inquiry.website_goal_other;
    }
    const goalMap: Record<string, string> = {
      personal: "Personal Website / Portfolio",
      ecommerce: "E-commerce Solutions",
      "ai-tool": "Custom AI Integration",
    };
    return goalMap[inquiry.website_goal] || inquiry.website_goal;
  };

  const getStatusInfo = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Project Status</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your email to see the current stage of your project.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-secondary/30 border-glass-border"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking files...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Track Status
                </>
              )}
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {hasSearched && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-4"
            >
              {inquiries.length === 0 ? (
                <div className="glass-card rounded-xl p-8 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium text-foreground">No records found</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    I haven't logged any projects under this email yet.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-foreground">
                    Project History ({inquiries.length})
                  </h2>
                  {inquiries.map((inquiry, index) => {
                    const statusInfo = getStatusInfo(inquiry.status);
                    return (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {inquiry.business_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {getGoalText(inquiry)}
                            </p>
                          </div>
                          <Badge variant="outline" className={statusInfo.color}>
                            <span className="mr-1.5">{statusInfo.icon}</span>
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Initiated:{" "}
                            {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          {inquiry.updated_at !== inquiry.created_at && (
                            <span className="text-muted-foreground">
                              Last updated:{" "}
                              {new Date(inquiry.updated_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 p-3 rounded-lg bg-secondary/30">
                          <p className="text-sm text-muted-foreground italic">
                            {inquiry.status === "pending" &&
                              "I've received your requirements and I'm currently reviewing the technical scope."}
                            {inquiry.status === "in-progress" &&
                              "The build is currently in development. I'm focusing on the core integration features."}
                            {inquiry.status === "preview-sent" &&
                              "A live preview is ready. Please check your email for the link and let me know your thoughts."}
                            {inquiry.status === "completed" &&
                              "The project is complete and fully deployed. I've sent the final access details to your inbox."}
                            {inquiry.status === "cancelled" &&
                              "This inquiry has been closed or archived."}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackOrder;