import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoDB";
import { auth } from '@clerk/nextjs/server';

export const createUser = async (user: UserType) => {
  try {
    await connectToDB();
    const existingUser = await User.findOneAndUpdate(
      { email_address: user.email_address },
      user,
      { upsert: true, new: true }
    )
    if (existingUser?.clerk_id) {
      return JSON.parse(JSON.stringify(existingUser));
    }
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAciveUser = async () => {
  try {
    const { userId } = await auth();
    await connectToDB();
    const DbUser = await User.find({ ckerk_id: userId })
    return DbUser
  } catch (error) {
    console.log(error);
    return null;
  }
}