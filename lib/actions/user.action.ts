import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoDB"

export const createUser = async (user: UserType) => {
  try {
    await connectToDB();
    // const existingUser = await User.findOne({ email_address: user.email_address })
    // if (existingUser?.clerk_id) {
    //   return JSON.parse(JSON.stringify(existingUser));
    // }
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    return null;
  }
}