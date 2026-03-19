import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  status: { type: String, enum: ['submitted', 'reviewed', 'approved', 'rejected'], default: 'submitted' },
  submittedDate: { type: Date, default: Date.now },
  notes: String,
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
