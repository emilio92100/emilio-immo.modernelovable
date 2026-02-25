
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL DEFAULT 'contact',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  -- Buyer mandate specific fields
  budget TEXT,
  property_type TEXT,
  desired_location TEXT,
  desired_surface TEXT,
  timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow anonymous inserts (public contact form)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);
