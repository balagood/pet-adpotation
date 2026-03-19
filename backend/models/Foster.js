import mongoose from "mongoose";

const fosterSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
}, { timestamps: true });


export default mongoose.model("Foster",fosterSchema);