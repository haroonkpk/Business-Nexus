import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Common
    bio: { type: String },

    // Entrepreneur-only
    startupName: { type: String },
    startupDescription: { type: String },
    fundingNeed: { type: String },
    pitchDeckUrl: { type: String },

    // Investor-only
    investmentInterests: [{ type: String }],
    portfolioCompanies: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
