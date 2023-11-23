import { User } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB=async(userData:TUser)=>{
     if (await User.isUserExists(userData.userId)) {
       throw new Error("User already exists");
     }
const result=await User.create(userData)
return result;
}

const getUsersDataFromDB =async()=>{
    const result=await User.find();
    return result;
}

const getSingleUserFromDB=async(id:number)=>{
   if (!(await User.isUserExists(id))) {
     throw new Error("User not found");
   }
    const result=await User.findOne({userId:id});
    return result;
}

const updateUserToDB = async (id: number, updateData: TUser) => {
    if (!(await User.isUserExists(id))) {
      throw new Error("User not found");
    }
  const result = await User.replaceOne({ userId: id }, updateData);
  return result;
};

const deleteUserFromDB= async(id: number)=>{
    if (!(await User.isUserExists(id))) {
      throw new Error("User not found");
    }
    const result = await User.deleteOne({userId:id});
    return result;
}

export const UserServices = {
  createUserIntoDB,
  getUsersDataFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserFromDB,
};