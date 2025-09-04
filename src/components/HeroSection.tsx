import { Button } from "@/components/ui/button";
import { Plane, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/helicopter-hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-75" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-sky bg-clip-text text-transparent">
                Elite
              </span>{" "}
              <span className="text-foreground">Helicopter</span>
              <br />
              <span className="text-aviation-gold">Taxi Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Premium helicopter transportation for the modern executive. 
              Skip the traffic, embrace the sky.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="premium" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              <Plane className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-lg px-8 py-6 border border-border hover:bg-card"
              onClick={() => navigate("/routes")}
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Routes
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-aviation-gold mb-2">15min</div>
              <div className="text-muted-foreground">Average Flight Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-aviation-gold mb-2">24/7</div>
              <div className="text-muted-foreground">Available Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-aviation-gold mb-2">100%</div>
              <div className="text-muted-foreground">Safety Record</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-aviation-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-aviation-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;