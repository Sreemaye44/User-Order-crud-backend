import { Request, Response } from "express";
import UserValidationSchema from "./user.validation";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zotParseData = UserValidationSchema.parse(userData);
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
      message: err.message || "User not found",
      error: err,
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
    const { user: updateData } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const zotParseData = UserValidationSchema.parse(updateData);
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
      message: err.message || "User not found",
      error: err,
    });
  }
};

// const addOrder = async (req: Request, res: Response) => {
// try{
//     const {  user: orderData} = req.body;
//     const userId = parseInt(req.params.userId, 10);
//     const zotParseData = UserValidationSchema.parse(orderData);
//     const userWithOrderStatus = await UserServices.getSingleUserFromDB(userId);
  
//     const result = await UserServices.createOrder(userId, zotParseData, userWithOrderStatus);

// }catch(err:any){
//    res.status(500).json({
//      success: false,
//      message: err.message || "User not found",
//      error: err,
//    });
// }
// };

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  // addOrder,
};
