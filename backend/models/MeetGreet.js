import mongoose from "mongoose";

const meetGreetSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    adopterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    /* date: {
      type: Date,
      required: true,
    }, */
    meetingDate: {
      type: String,
      required: true,
    },

     slot: {
      type: String,
      required: true,
    },

    
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "rescheduled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MeetGreet", meetGreetSchema);