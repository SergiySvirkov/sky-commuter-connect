import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RouteBooking from "@/components/RouteBooking";
import ServicesSection from "@/components/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RouteBooking />
      <ServicesSection />
      
      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-aviation-gold">Elite Helicopter</h4>
              <p className="text-muted-foreground">
                Premium helicopter taxi service for the modern executive.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Airport Transfers</li>
                <li>Corporate Travel</li>
                <li>City Tours</li>
                <li>Emergency Transport</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Phone: +1 (555) 123-HELI</li>
                <li>Email: fly@elitehelicopter.com</li>
                <li>24/7 Concierge Service</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex space-x-4 text-muted-foreground">
                <a href="#" className="hover:text-aviation-gold transition-colors">Twitter</a>
                <a href="#" className="hover:text-aviation-gold transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-aviation-gold transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Elite Helicopter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
