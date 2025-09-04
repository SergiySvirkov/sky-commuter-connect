import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const RouteBooking = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  
  const popularRoutes = [
    { from: "Manhattan", to: "JFK Airport", time: "8min", price: "$195" },
    { from: "Downtown", to: "Hamptons", time: "45min", price: "$750" },
    { from: "Wall St", to: "Teterboro", time: "12min", price: "$285" },
    { from: "Midtown", to: "Newark", time: "15min", price: "$320" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Plan Your <span className="text-aviation-gold">Route</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our popular routes or create a custom flight plan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <Card className="shadow-premium bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6 text-aviation-gold" />
                Book Your Flight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure">Departure Point</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select departure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manhattan">Manhattan Heliport</SelectItem>
                      <SelectItem value="downtown">Downtown Helipad</SelectItem>
                      <SelectItem value="wall-st">Wall Street Landing</SelectItem>
                      <SelectItem value="midtown">Midtown Plaza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jfk">JFK Airport</SelectItem>
                      <SelectItem value="lga">LaGuardia Airport</SelectItem>
                      <SelectItem value="hamptons">The Hamptons</SelectItem>
                      <SelectItem value="teterboro">Teterboro Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Flight Date</Label>
                  <Input type="date" className="bg-background" />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input type="time" className="bg-background" />
                </div>
              </div>

              <div>
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="premium" className="w-full" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Popular Routes</h3>
            <div className="space-y-4">
              {popularRoutes.map((route, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer transition-all duration-300 hover:shadow-aviation border-border bg-card/30 backdrop-blur-sm hover:bg-card/50"
                  onClick={() => setSelectedRoute(`${route.from}-${route.to}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-sky rounded-lg p-3">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-lg font-semibold">
                            <span>{route.from}</span>
                            <ArrowRight className="w-4 h-4 text-aviation-gold" />
                            <span>{route.to}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {route.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-aviation-gold">{route.price}</div>
                        <div className="text-sm text-muted-foreground">per person</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteBooking;