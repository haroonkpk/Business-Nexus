import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  img: {
    type: String,
  },
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
});

const Episode = mongoose.model("Episode", episodeSchema);

export default Episode;
