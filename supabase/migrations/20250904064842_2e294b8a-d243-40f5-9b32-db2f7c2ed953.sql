-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create order_history table
CREATE TABLE public.order_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  route_from TEXT NOT NULL,
  route_to TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME NOT NULL,
  passengers INTEGER NOT NULL,
  total_amount NUMERIC,
  helicopter_used TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on order_history
ALTER TABLE public.order_history ENABLE ROW LEVEL SECURITY;

-- Create policies for order_history
CREATE POLICY "Users can view their own order history" 
ON public.order_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own order history" 
ON public.order_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update bookings table to properly link to auth.users
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for order_history
CREATE TRIGGER update_order_history_updated_at
  BEFORE UPDATE ON public.order_history
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Drop the old users table as we're using auth.users and profiles now
DROP TABLE IF EXISTS public.users;