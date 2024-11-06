import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  clerk_id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  // Add any other fields you want to store

  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  bio: String,
  collections: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }]
  },
}, { timestamps: true });

const Artist = mongoose.models.Artist || mongoose.model("Artist", artistSchema);

export default Artist;