import { z } from 'zod';

// Auth Validators
export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  specialization: z.string().min(1, 'Specialization is required'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  specialization: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

// Course Validators
export const CreateCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  duration: z.string(),
  level: z.string(),
  category: z.enum(['diploma', 'course']),
  content: z.array(z.string()).min(1),
  instructor: z.string().optional(),
  maxStudents: z.number().positive().optional(),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

// Registration Validators
export const CreateRegistrationSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});

// Payment Validators
export const CreatePaymentSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'wallet', 'cash']),
});

// Consultation Validators
export const CreateConsultationSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['psychological', 'legal']),
  description: z.string().min(10),
  price: z.number().positive(),
  specialist: z.string().min(2),
  specialization: z.string().min(2),
  experience: z.string().min(2),
});

export const BookConsultationSchema = z.object({
  consultationId: z.string().min(1),
  date: z.string().datetime(),
  time: z.string(),
});

// Studio Validators
export const CreateStudioServiceSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['video_production', 'audio_recording', 'podcast', 'events', 'visual_content', 'music']),
  description: z.string().min(10),
  features: z.array(z.string()).min(1),
  basePrice: z.number().positive(),
});

export const CreateStudioRequestSchema = z.object({
  serviceId: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  budget: z.number().positive(),
  deadline: z.string().datetime().optional(),
});

// Event Validators
export const CreateEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(['conference', 'workshop', 'seminar', 'webinar', 'training', 'other']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().min(3),
  capacity: z.number().positive(),
  price: z.number().nonnegative().optional(),
});

// Contact Validators
export const CreateContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(10),
});

// Pagination Validator
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type CreatePaymentInput = z.infer<typeof CreatePaymentSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
