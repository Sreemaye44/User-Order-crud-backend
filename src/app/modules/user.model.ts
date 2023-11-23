import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user/user.interface";
import bcrypt from "bcrypt";
import config from "../config";

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const OrderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: AddressSchema, required: true },
  orders: {type: [OrderSchema]},
});

//create passowrd decrypt middleware

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

//creating static schema method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser,UserModel>("user", userSchema);
