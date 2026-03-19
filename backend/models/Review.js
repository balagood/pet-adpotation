import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

export default mongoose.model("Review",reviewSchema)