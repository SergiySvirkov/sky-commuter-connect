import { Button } from "@/components/ui/button";
import { Plane, Phone } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-xl">
              Elite <span className="text-aviation-gold">Helicopter</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#routes" className="text-foreground hover:text-aviation-gold transition-colors">
              Routes
            </a>
            <a href="#services" className="text-foreground hover:text-aviation-gold transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-foreground hover:text-aviation-gold transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-foreground hover:text-aviation-gold transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button variant="premium" size="sm">
              Book Flight
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;