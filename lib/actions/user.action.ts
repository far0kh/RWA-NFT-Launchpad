import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoDB"

export const createUser = async (user: UserType) => {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}