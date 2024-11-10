import mongoose from "mongoose";

const newcomerSchema = new mongoose.Schema({
  clerk_id: {
    type: String,
    required: true,
    unique: true,
  },
  db_id: {
    type: String,
    required: true,
    unique: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  primaryGenre: {
    type: String,
    required: true,
  },
  yearsPerforming: {
    type: String,
    required: false,
  },
  musicalJourney: {
    type: String,
    required: false,
  },
  preferredInstrument: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Newcomer = mongoose.models.Newcomer || mongoose.model("Newcomer", newcomerSchema);

export default Newcomer;
