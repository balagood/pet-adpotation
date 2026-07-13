import mongoose from "mongoose";

const fosterUpdateSchema = new mongoose.Schema(
  {
    fosterId: {type: mongoose.Schema.Types.ObjectId,ref: "Foster",required: true},
    petId: {type: mongoose.Schema.Types.ObjectId,ref: "Pet",required: true},
    fosterParentId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    description: {type: String,required: true},
    healthStatus: {type: String,default: ""},
    weight: {type: Number,default: 0},
    photos: [{type: String},],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FosterUpdate", fosterUpdateSchema);