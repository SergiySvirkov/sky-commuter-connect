import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Users, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [helicopters, setHelicopters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [routesResponse, helicoptersResponse] = await Promise.all([
        supabase.from("routes").select("*"),
        supabase.from("helicopters").select("*").eq("status", "available")
      ]);

      if (routesResponse.error) {
        console.error("Error fetching routes:", routesResponse.error);
      } else {
        setRoutes(routesResponse.data || []);
      }

      if (helicoptersResponse.error) {
        console.error("Error fetching helicopters:", helicoptersResponse.error);
      } else {
        setHelicopters(helicoptersResponse.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">Loading routes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-aviation-gold hover:text-aviation-gold/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Popular <span className="text-aviation-gold">Routes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover our most requested helicopter routes and fleet
            </p>
          </div>

          {/* Routes Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Flight Routes</h2>
            {routes.length === 0 ? (
              <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border">
                <p className="text-muted-foreground">No routes available at the moment.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                  <Card 
                    key={route.id}
                    className="shadow-premium bg-card/50 backdrop-blur-sm border-border hover:shadow-aviation transition-all duration-300 hover:bg-card/60"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="bg-gradient-sky rounded-lg p-3">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-aviation-gold">
                              ${route.price_per_person}
                            </div>
                            <div className="text-sm text-muted-foreground">per person</div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {route.from_location} → {route.to_location}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {route.duration_minutes} min
                            </span>
                            {route.distance_miles && (
                              <span>
                                {route.distance_miles} miles
                              </span>
                            )}
                          </div>
                        </div>

                        <Link to="/booking">
                          <Button variant="premium" className="w-full">
                            <Plane className="w-4 h-4 mr-2" />
                            Book This Route
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Fleet Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Fleet</h2>
            {helicopters.length === 0 ? (
              <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border">
                <p className="text-muted-foreground">No helicopters available at the moment.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helicopters.map((helicopter) => (
                  <Card 
                    key={helicopter.id}
                    className="shadow-premium bg-card/50 backdrop-blur-sm border-border hover:shadow-aviation transition-all duration-300 hover:bg-card/60"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {helicopter.image_url && (
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                            <img 
                              src={helicopter.image_url} 
                              alt={helicopter.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{helicopter.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{helicopter.model}</p>
                          {helicopter.description && (
                            <p className="text-sm text-muted-foreground mb-3">{helicopter.description}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{helicopter.capacity} passengers</span>
                          </div>
                          <div className="text-aviation-gold font-semibold">
                            ${helicopter.hourly_rate}/hour
                          </div>
                        </div>

                        {helicopter.specifications && Object.keys(helicopter.specifications).length > 0 && (
                          <div className="pt-3 border-t border-border">
                            <h4 className="text-sm font-semibold mb-2">Specifications</h4>
                            <div className="text-xs text-muted-foreground space-y-1">
                              {Object.entries(helicopter.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key.replace('_', ' ')}:</span>
                                  <span>{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link to="/booking">
                          <Button variant="outline" className="w-full">
                            <Plane className="w-4 h-4 mr-2" />
                            Book This Aircraft
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;