import { z } from 'zod';

// Product Schemas
export const WeightOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  priceModifier: z.number()
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.string(),
  description: z.string(),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
  discount: z.number().min(0).max(100).optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  weightOptions: z.array(WeightOptionSchema).optional(),
  selectedWeight: z.string().optional()
});

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url()
});

// Order Schemas
export const ProgressStepSchema = z.object({
  id: z.number(),
  status: z.string(),
  time: z.string(),
  completed: z.boolean(),
  icon: z.string()
});

export const DriverInfoSchema = z.object({
  name: z.string(),
  vehicle: z.string(),
  image: z.string().url(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/) // E.164 format
});

export const OrderDetailsSchema = z.object({
  id: z.string(),
  status: z.string(),
  eta: z.string(),
  distance: z.string(),
  progress: z.array(ProgressStepSchema),
  driver: DriverInfoSchema,
  instructions: z.string(),
  contactless: z.boolean(),
  mapImage: z.string().url()
});

// Cart Schema
export const CartItemSchema = ProductSchema.extend({
  quantity: z.number().positive()
});

// User Schemas
export const UserAddressSchema = z.object({
  id: z.string(),
  type: z.enum(['home', 'work', 'other']),
  address: z.string(),
  details: z.string().optional(),
  isDefault: z.boolean().optional()
});

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(), // E.164 format
  addresses: z.array(UserAddressSchema)
});

// Helper function to validate data
export function validateData<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
} 