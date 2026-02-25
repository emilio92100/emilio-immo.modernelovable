
ALTER TABLE public.contact_submissions
ADD COLUMN is_called BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN admin_notes TEXT;

-- Allow admins to update submissions (mark as called, add notes)
CREATE POLICY "Admins can update submissions" ON public.contact_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
