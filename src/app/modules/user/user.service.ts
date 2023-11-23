import { User } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB=async(userData:TUser)=>{
const result=await User.create(userData)
return result;
}

const getUsersDataFromDB =async()=>{
    const result=await User.find();
    return result;
}

const getSingleUserFromDB=async(id:string)=>{
    console.log(id);
    const result=await User.findOne({userId:id});
    console.log(result)
    return result;
}

const updateUserToDB = async (id: string, updateData: TUser) => {
  const result = await User.replaceOne({ userId: id }, updateData);
  return result;
};

const deleteUserFromDB= async(id: string)=>{
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