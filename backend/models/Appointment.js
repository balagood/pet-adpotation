import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String }

}, { timestamps: true });


export default mongoose.model("Appointment",appointmentSchema);