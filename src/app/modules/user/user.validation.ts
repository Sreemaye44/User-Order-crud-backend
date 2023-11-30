import { z } from "zod";
const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "First Name should start with a capital letter and contain only alphabetic characters",
    }),
  lastName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, {
      message: "Last Name should contain only alphabetic characters",
    }),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string(),
});

const OrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameValidationSchema,
  age: z.number().int().positive().refine((age) => age !== 0, {
  message: "Age must be a positive number and cannot be zero",
}),
  email: z.string().email({
    message: "Invalid email format",
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export const ValidationSchema={
  UserValidationSchema, 
  OrderValidationSchema
}