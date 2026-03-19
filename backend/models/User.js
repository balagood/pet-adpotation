import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['adopter', 'shelter', 'foster'], required: true },
  location: String,
  contactInfo: String,
}, { timestamps: true });

//export default mongoose.models.User || mongoose.model('Password',passwordSchema)
export default mongoose.model("User", userSchema);
