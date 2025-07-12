import mongoose from "mongoose";
const collabRequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    }, // Investor Profile
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    }, // Entrepreneur Profile
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default  mongoose.model("CollabRequest", collabRequestSchema);
