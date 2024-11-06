import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerk_id: {
    type: String,
    required: true,
    unique: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  image_url: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;