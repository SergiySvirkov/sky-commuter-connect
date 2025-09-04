import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  LogOut,
  User,
  History
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
}

interface OrderHistory {
  id: string;
  route_from: string;
  route_to: string;
  flight_date: string;
  flight_time: string;
  passengers: number;
  total_amount?: number;
  helicopter_used?: string;
  status: string;
  created_at: string;
}

interface RecentBooking {
  id: string;
  departure_point: string;
  destination: string;
  flight_date: string;
  flight_time: string;
  passengers: number;
  status: string;
  customer_name?: string;
}

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [profileResponse, historyResponse, bookingsResponse] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user?.id).single(),
        supabase.from("order_history").select("*").eq("user_id", user?.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("bookings").select("*").eq("user_id", user?.id).order("created_at", { ascending: false }).limit(5)
      ]);

      if (profileResponse.data) setProfile(profileResponse.data);
      if (historyResponse.data) setOrderHistory(historyResponse.data);
      if (bookingsResponse.data) setRecentBookings(bookingsResponse.data);

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600';
      case 'confirmed': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">Loading dashboard...</div>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="text-aviation-gold">{profile?.full_name || user?.email}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your premium helicopter service dashboard
              </p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link to="/booking">
              <Card className="hover:shadow-aviation transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-sky rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Book New Flight</h3>
                  <p className="text-sm text-muted-foreground">Reserve your next helicopter ride</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/routes">
              <Card className="hover:shadow-aviation transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-sky rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">View Routes</h3>
                  <p className="text-sm text-muted-foreground">Explore available destinations</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-sky rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your account settings</p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              <TabsTrigger value="history">Flight History</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-8">
              <Card className="shadow-premium bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-aviation-gold" />
                    Recent Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No recent bookings found</p>
                      <Link to="/booking">
                        <Button variant="premium" className="mt-4">
                          Book Your First Flight
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">
                                {booking.departure_point} → {booking.destination}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {booking.flight_date} at {booking.flight_time}
                                <Users className="w-4 h-4 ml-2" />
                                {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold capitalize ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-8">
              <Card className="shadow-premium bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-aviation-gold" />
                    Flight History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orderHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No flight history available</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your completed flights will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderHistory.map((order) => (
                        <div 
                          key={order.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">
                                {order.route_from} → {order.route_to}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {order.flight_date} at {order.flight_time}
                                <Users className="w-4 h-4 ml-2" />
                                {order.passengers} passenger{order.passengers > 1 ? 's' : ''}
                              </div>
                              {order.helicopter_used && (
                                <div className="text-xs text-muted-foreground">
                                  Aircraft: {order.helicopter_used}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </div>
                            {order.total_amount && (
                              <div className="text-sm text-muted-foreground">
                                ${order.total_amount}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;