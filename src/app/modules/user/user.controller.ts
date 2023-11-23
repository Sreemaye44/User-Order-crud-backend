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
      message: err.message || "went wrong",
      error: err,
    });
  }
};

export const userController={
    createUser
}
