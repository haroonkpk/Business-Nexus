import mongoose from "mongoose";
const storySchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoryType",
    },
    img: String,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
