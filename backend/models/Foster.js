import mongoose from "mongoose";

const fosterSchema = new mongoose.Schema(
  {
    petId: {type: mongoose.Schema.Types.ObjectId,ref: "Pet",required: true},
    shelterId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    fosterParentId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    requestedBy: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    startDate: {type: Date,required: true},
    endDate: {type: Date,default: null},
    status: {type: String,enum: ["pending", "accepted", "rejected", "completed"],default: "pending"},
    notes: {type: String,default: ""},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Foster", fosterSchema);