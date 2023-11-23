import { Request, Response } from "express";
import UserValidationSchema from "./user.validation";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zotParseData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zotParseData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
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

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
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
    const {userId} =req.params;
    console.log("🚀 ~ file: user.controller.ts:44 ~ getSingleUser ~ userId:", typeof(userId))
    const result = await UserServices.getSingleUserFromDB(userId);
     res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: err,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
     res.status(200).json({
       success: true,
       message: "User updated successfully!",
       data: result,
     });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const {user: updateData} =req.body;
     const { userId } = req.params;
     const zotParseData = UserValidationSchema.parse(updateData);
    const result = await UserServices.updateUserToDB(userId,zotParseData);
    const updateUser = await UserServices.getSingleUserFromDB(userId);
     res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: updateUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: err,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
