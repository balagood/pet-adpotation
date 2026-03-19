import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contactInfo: String,
  description: String,
  ratingAvg: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.model("Shelter", shelterSchema);
