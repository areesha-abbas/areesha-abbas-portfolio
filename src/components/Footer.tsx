import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Areesha Abbas. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/track-status" 
              className="hover:text-primary transition-colors"
            >
              Project Status
            </Link>
            {/* Minimalist admin access point */}
            <Link 
              to="/admin/login" 
              className="opacity-20 hover:opacity-100 transition-opacity text-xs"
              aria-label="Admin Login"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;