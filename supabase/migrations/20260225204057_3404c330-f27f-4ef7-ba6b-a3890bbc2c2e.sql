
ALTER TABLE public.contact_submissions 
ADD COLUMN property_ref TEXT,
ADD COLUMN property_title TEXT;

-- Allow anonymous select for admin page (we'll add proper auth later if needed)
CREATE POLICY "Allow anonymous select" ON public.contact_submissions
  FOR SELECT USING (true);
