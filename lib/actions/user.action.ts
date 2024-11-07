import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoDB"

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