import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";

const BookingPage = () => {
  const [helicopters, setHelicopters] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    helicopter_id: "",
    route_id: "",
    departure_point: "",
    destination: "",
    flight_date: "",
    flight_time: "",
    passengers: 1,
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    special_requests: "",
  });

  useEffect(() => {
    fetchHelicopters();
    fetchRoutes();
  }, []);

  const fetchHelicopters = async () => {
    const { data, error } = await supabase
      .from("helicopters")
      .select("*")
      .eq("status", "available");

    if (error) {
      console.error("Error fetching helicopters:", error);
    } else {
      setHelicopters(data || []);
    }
  };

  const fetchRoutes = async () => {
    const { data, error } = await supabase
      .from("routes")
      .select("*");

    if (error) {
      console.error("Error fetching routes:", error);
    } else {
      setRoutes(data || []);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("bookings")
        .insert([{
          helicopter_id: formData.helicopter_id || null,
          route_id: formData.route_id || null,
          departure_point: formData.departure_point,
          destination: formData.destination,
          flight_date: formData.flight_date,
          flight_time: formData.flight_time,
          passengers: formData.passengers,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          special_requests: formData.special_requests,
          status: "pending"
        }]);

      if (error) throw error;

      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you within 24 hours to confirm your flight details.",
      });

      // Reset form
      setFormData({
        helicopter_id: "",
        route_id: "",
        departure_point: "",
        destination: "",
        flight_date: "",
        flight_time: "",
        passengers: 1,
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        special_requests: "",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-aviation-gold hover:text-aviation-gold/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your <span className="text-aviation-gold">Flight</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Reserve your premium helicopter experience
            </p>
          </div>

          {/* Booking Form */}
          <Card className="shadow-premium bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Plane className="w-6 h-6 text-aviation-gold" />
                Flight Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customer_name">Full Name *</Label>
                      <Input
                        id="customer_name"
                        value={formData.customer_name}
                        onChange={(e) => handleInputChange("customer_name", e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer_email">Email *</Label>
                      <Input
                        id="customer_email"
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => handleInputChange("customer_email", e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customer_phone">Phone Number *</Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => handleInputChange("customer_phone", e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Flight Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departure_point">Departure Point *</Label>
                      <Input
                        id="departure_point"
                        value={formData.departure_point}
                        onChange={(e) => handleInputChange("departure_point", e.target.value)}
                        required
                        className="bg-background"
                        placeholder="e.g., Manhattan Heliport"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination *</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        required
                        className="bg-background"
                        placeholder="e.g., JFK Airport"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="flight_date">Flight Date *</Label>
                      <Input
                        id="flight_date"
                        type="date"
                        value={formData.flight_date}
                        onChange={(e) => handleInputChange("flight_date", e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="flight_time">Preferred Time *</Label>
                      <Input
                        id="flight_time"
                        type="time"
                        value={formData.flight_time}
                        onChange={(e) => handleInputChange("flight_time", e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="passengers">Passengers *</Label>
                      <Select value={formData.passengers.toString()} onValueChange={(value) => handleInputChange("passengers", parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                          <SelectItem value="5">5 Passengers</SelectItem>
                          <SelectItem value="6">6 Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Helicopter Selection */}
                {helicopters.length > 0 && (
                  <div>
                    <Label htmlFor="helicopter_id">Preferred Helicopter (Optional)</Label>
                    <Select value={formData.helicopter_id} onValueChange={(value) => handleInputChange("helicopter_id", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a helicopter" />
                      </SelectTrigger>
                      <SelectContent>
                        {helicopters.map((helicopter) => (
                          <SelectItem key={helicopter.id} value={helicopter.id}>
                            {helicopter.name} ({helicopter.model}) - {helicopter.capacity} passengers
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Route Selection */}
                {routes.length > 0 && (
                  <div>
                    <Label htmlFor="route_id">Popular Route (Optional)</Label>
                    <Select value={formData.route_id} onValueChange={(value) => handleInputChange("route_id", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a popular route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.from_location} → {route.to_location} ({route.duration_minutes}min - ${route.price_per_person}/person)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Special Requests */}
                <div>
                  <Label htmlFor="special_requests">Special Requests</Label>
                  <Textarea
                    id="special_requests"
                    value={formData.special_requests}
                    onChange={(e) => handleInputChange("special_requests", e.target.value)}
                    className="bg-background"
                    placeholder="Any special requirements or requests..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {loading ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;