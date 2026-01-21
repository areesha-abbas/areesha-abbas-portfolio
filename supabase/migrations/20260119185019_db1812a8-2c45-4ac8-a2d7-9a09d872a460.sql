-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can submit orders" ON public.orders;

CREATE POLICY "Anyone can submit orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);