-- Create helicopters table for fleet management
CREATE TABLE public.helicopters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  hourly_rate DECIMAL(10,2) NOT NULL,
  specifications JSONB DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'maintenance', 'booked')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create routes table for predefined flight routes
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price_per_person DECIMAL(10,2) NOT NULL,
  distance_miles DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for flight reservations
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  helicopter_id UUID REFERENCES public.helicopters(id),
  route_id UUID REFERENCES public.routes(id),
  departure_point TEXT NOT NULL,
  destination TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers > 0),
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.helicopters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for helicopters (public read access)
CREATE POLICY "Anyone can view helicopters" 
ON public.helicopters 
FOR SELECT 
USING (true);

-- Create RLS policies for routes (public read access)
CREATE POLICY "Anyone can view routes" 
ON public.routes 
FOR SELECT 
USING (true);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_helicopters_updated_at
  BEFORE UPDATE ON public.helicopters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample helicopter fleet data
INSERT INTO public.helicopters (name, model, capacity, description, hourly_rate, specifications) VALUES
('Elite Sky One', 'Bell 407', 6, 'Luxury executive helicopter with panoramic windows and premium leather interior', 2500.00, '{"range": "374 miles", "cruise_speed": "133 mph", "features": ["Air conditioning", "Noise-canceling headsets", "Premium leather seats", "Panoramic windows"]}'),
('Executive Express', 'Airbus H125', 5, 'Fast and efficient single-engine helicopter perfect for business travel', 1800.00, '{"range": "395 miles", "cruise_speed": "155 mph", "features": ["Advanced avionics", "Comfortable seating", "Cargo space", "Weather radar"]}'),
('VIP Voyager', 'Bell 429', 8, 'Twin-engine luxury helicopter with spacious cabin and premium amenities', 3200.00, '{"range": "416 miles", "cruise_speed": "160 mph", "features": ["Twin-engine safety", "VIP interior", "Entertainment system", "Climate control"]}'),
('Sky Shuttle', 'Robinson R66', 4, 'Reliable and cost-effective helicopter for shorter routes', 1200.00, '{"range": "350 miles", "cruise_speed": "110 mph", "features": ["Economical operation", "Excellent visibility", "Easy boarding", "Reliable performance"]}');

-- Insert sample routes data
INSERT INTO public.routes (from_location, to_location, duration_minutes, price_per_person, distance_miles) VALUES
('Manhattan Heliport', 'JFK Airport', 8, 195.00, 15.2),
('Downtown Helipad', 'The Hamptons', 45, 750.00, 85.0),
('Wall Street Landing', 'Teterboro Airport', 12, 285.00, 18.5),
('Midtown Plaza', 'Newark Airport', 15, 320.00, 22.0),
('Manhattan Heliport', 'LaGuardia Airport', 10, 225.00, 12.8),
('Downtown Helipad', 'Atlantic City', 60, 950.00, 120.0),
('Midtown Plaza', 'The Hamptons', 40, 720.00, 82.0),
('Wall Street Landing', 'Westchester Airport', 25, 450.00, 35.0);