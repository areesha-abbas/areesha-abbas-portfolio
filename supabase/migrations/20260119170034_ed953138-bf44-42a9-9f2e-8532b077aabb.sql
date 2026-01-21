-- Add notes column to orders table for admin comments
ALTER TABLE public.orders ADD COLUMN admin_notes TEXT;

-- Drop existing restrictive SELECT policy
DROP POLICY IF EXISTS "Service role can view all orders" ON public.orders;

-- Create a function to check if user is admin (hardcoded email)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'areeshaabbas07@gmail.com'
  )
$$;

-- Allow admin to view all orders
CREATE POLICY "Admin can view all orders" 
ON public.orders 
FOR SELECT 
USING (public.is_admin());

-- Allow admin to update orders (status, notes)
CREATE POLICY "Admin can update orders" 
ON public.orders 
FOR UPDATE 
USING (public.is_admin());

-- Allow admin to delete orders
CREATE POLICY "Admin can delete orders" 
ON public.orders 
FOR DELETE 
USING (public.is_admin());