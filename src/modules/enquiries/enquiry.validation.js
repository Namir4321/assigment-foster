import { z } from 'zod';

export const createEnquirySchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email address'),
  courseInterest: z.string().min(1, 'Course interest is required').trim(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export const enquiryIdSchema = z.string().uuid('Invalid enquiry ID format');
