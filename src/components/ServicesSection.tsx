import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Star, Headphones } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our helicopters undergo rigorous maintenance and safety checks. Our pilots are certified with thousands of flight hours.",
    },
    {
      icon: Clock,
      title: "On-Time Guarantee",
      description: "We guarantee punctual departures and arrivals. Skip traffic jams and arrive at your destination on schedule.",
    },
    {
      icon: Star,
      title: "Luxury Experience",
      description: "Premium interiors, noise-canceling headsets, and professional service make your flight comfortable and memorable.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our concierge team is available around the clock to assist with bookings, changes, and special requests.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-aviation-gold">Elite Helicopter</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the pinnacle of urban transportation with our premium helicopter taxi service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="text-center hover:shadow-aviation transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border"
            >
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Areas */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8">Service Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["Manhattan", "Brooklyn", "Queens", "Bronx", "JFK Airport", "LaGuardia", "The Hamptons", "Newark"].map((area, index) => (
              <div 
                key={index}
                className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4 hover:bg-card/50 transition-colors"
              >
                <div className="text-aviation-gold font-semibold">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;