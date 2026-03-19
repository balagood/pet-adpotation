import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  name: { type: String, required: true },
  age: Number,
  breed: String,
  size: String,
  color: String,
  medicalHistory: String,
  status: { type: String, enum: ['available', 'adopted', 'fostered'], default: 'available' },
  photos: [String], // URLs
 // videos: [String], // URLs
}, { timestamps: true });


export default mongoose.model("Pet", petSchema);
