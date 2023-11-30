import { Request, Response } from "express";

import { UserServices } from "./user.service";
import { ValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData= req.body;
    const zotParseData = ValidationSchema.UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zotParseData);
    const sanitizedResult = result.toObject({ getters: true });
    const { password, ...resultWithoutPassword } = sanitizedResult;
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: resultWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersDataFromDB();
    const sanitizedResult = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: sanitizedResult,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.getSingleUserFromDB(userId);
    if (!result) {
      throw new Error("User not found");
    }
    const sanitizedResult = result.toObject({ getters: true });
    const { password, ...resultWithoutPassword } = sanitizedResult;

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: resultWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { user: updateData } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const zotParseData = ValidationSchema.UserValidationSchema.parse(updateData);
    const result = await UserServices.updateUserToDB(userId, zotParseData);
    const updateUser = await UserServices.getSingleUserFromDB(userId);
    if (!updateUser) {
      throw new Error("User not found");
    }
    const sanitizedResult = updateUser.toObject({ getters: true });
    const { password, ...resultWithoutPassword } = sanitizedResult;
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: resultWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zotParseData = ValidationSchema.OrderValidationSchema.parse(orderData);
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.createOrder(userId, zotParseData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};

const getSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.getSingleUserFromDB(userId);
    if (!result) {
      throw new Error("User not found");
    }
        const sanitizedResult = result.toObject({ getters: true });
        const { orders:orders} = sanitizedResult;

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data:{orders},
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const rawResult = await UserServices.totalPriceofOrders(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!!",
      data: { totalPrice: rawResult[0].totalPrice },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: {
        code: err.code || 500,
        description: err.description || "Internal Server Error",
      },
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getSingleUserOrder,
  getTotalPrice,
};
