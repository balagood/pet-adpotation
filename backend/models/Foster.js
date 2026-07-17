/* import mongoose from "mongoose";

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

export default mongoose.model("Foster", fosterSchema); */

import mongoose from "mongoose";
const fosterSchema = new mongoose.Schema({
    fosterParentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    shelterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    petId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pet",
        default:null
    },

    adopterId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      default:null
    },

    requestedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    name:String,
    age:Number,
    breed:String,
    size:String,
    color:String,
    medicalHistory:String,
    location:String,

    photos:[String],
    videos:[String],

    startDate:Date,
    endDate:Date,

    status: {
      type: String,
      enum: [
        "pending",             
        "requested",           
        "accepted",            
        "rejected", 
        "available",
        "completed"            
      ],
      default: "pending"
    },

    notes:String
},{
    timestamps:true
});
export default mongoose.model("Foster", fosterSchema);
