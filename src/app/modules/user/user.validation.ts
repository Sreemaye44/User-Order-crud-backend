import { z } from "zod";
const FullNameSchema = z.object({
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

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string(),
});

const OrderSchema = z.object({
  productName: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Price must be a valid number with up to 2 decimal places",
  }),
  quantity: z.string().regex(/^\d+$/, {
    message: "Quantity must be a positive integer",
  }),
});

const UserSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  age: z.number().int().positive().refine((age) => age !== 0, {
  message: "Age must be a positive number and cannot be zero",
}),
  email: z.string().email({
    message: "Invalid email format",
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema),
});
