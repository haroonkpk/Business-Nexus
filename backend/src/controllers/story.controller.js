import mongoose from "mongoose";
import Episode from "../models/episode.model.js";
import Story from "../models/story.models.js";
import StoryType from "../models/storyType.model.js";
import cloudinary from "../lib/cloudinary.js";

export const storyTypes = async (req, res) => {
  const { img, title, description } = req.body;

  if (!img || !title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let imagUrl;
  if (img) {
    const uploadResponse = await cloudinary.uploader.upload(img);
    imagUrl = uploadResponse.secure_url;
  }

  try {
    const Type = new StoryType({
      img: imagUrl,
      title,
      description,
    });
    await Type.save();
    res.status(201).json({ message: "StoryType created successfully", Type });
  } catch (error) {
    res.status(500).json({ message: "error in creating Type", error });
  }
};

export const story = async (req, res) => {
  const { img, title, description } = req.body;
  const { typeId } = req.params;
  if (!img || !title || !description || !typeId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const story = new Story({
      img,
      title,
      description,
      type: typeId,
    });
    await story.save();
    const populatedType = await Story.findById(story._id).populate("type");

    res
      .status(201)
      .json({ message: "Story created successfully", story: populatedType });
  } catch (error) {
    res.status(500).json({ message: "error in creating story", error });
  }
};

export const episodes = async (req, res) => {
  const { img, title, description } = req.body;
  const { storyId } = req.params;
  if (!img || !title || !description || !storyId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const episode = new Episode({
      img,
      title,
      description,
      story: storyId,
    });
    await episode.save();

    res.status(201).json({
      message: "episode created successfully",
      episode,
    });
  } catch (error) {
    res.status(500).json({ message: "error in creating episode", error });
  }
};

export const getStoryTypes = async (req, res) => {
  try {
    const allStoryTypes = await StoryType.find();
    res.status(201).json({ allStoryTypes });
  } catch (error) {
    res.status(501).json({ message: "error in getStoryType route", error });
  }
};

export const getStories = async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) {
    return res.status(404).json({ message: "Not found typeId" });
  }
  try {
    const stories = await Story.find({ type: typeId }).populate(
      "type",
      "title"
    );

    if (stories.length === 0) {
      return res
        .status(404)
        .json({ message: "No stories found for this type" });
    }

    res.status(200).json({ stories });
  } catch (error) {
    console.error("GetStory Error:", error.message);
    res.status(501).json({ message: "error in getStory route", error });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({});

    if (stories.length === 0) {
      return res
        .status(404)
        .json({ message: "No stories found for this type" });
    }

    res.status(200).json({ stories });
  } catch (error) {
    console.error("GetStory Error:", error.message);
    res.status(501).json({ message: "error in getStory route", error });
  }
};

export const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find({});

    if (episodes.length === 0) {
      return res.status(404).json({ message: "No Episodes found " });
    }

    res.status(200).json({ episodes });
  } catch (error) {
    console.error("GetEp Error:", error.message);
    res.status(501).json({ message: "error in getEp route", error });
  }
};

export const getEpisodes = async (req, res) => {
  const { storyId } = req.params;
  if (!storyId) {
    return res.status(404).json({ message: "Not found storyId" });
  }
  try {
    const episodes = await Episode.find({ story: storyId });
    if (!episodes) {
      return res.status(404).json({ message: "episodes not found" });
    }
    res.status(200).json({ message: "get episodes", episodes });
  } catch (error) {
    console.error("GetEpisodes Error:", error.message);
    res.status(501).json({ message: "error in getEpisode route", error });
  }
};

export const getEpisodeById = async (req, res) => {
  const { episodeId } = req.params;
  if (!episodeId) {
    return res.status(404).json({ message: "Not found episodeId" });
  }
  try {
    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ message: "episodes not found" });
    }
    res.status(200).json({ message: "get episode", episode });
  } catch (error) {
    console.error("GetEpisodes Error:", error.message);
    res.status(501).json({ message: "error in getEpisode route", error });
  }
};

// =======deletion================
export const deleteStoryType = async (req, res) => {
  const typeId = req.params.id;
  console.log(typeId);
  try {
    const deletedStory = await StoryType.findByIdAndDelete(typeId);
    if (!deletedStory) {
      return res.status(404).json({ message: "typeId not found" });
    }
    res.status(200).json({ message: ".type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting storyType", error });
  }
};

export const deleteStory = async (req, res) => {
  const storyId = req.params.id;
  try {
    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({ message: "storyId not found" });
    }
    res.status(200).json({ message: ".story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting story", error });
  }
};
export const deleteEpisode = async (req, res) => {
  const episodeId = req.params.id;
  try {
    const deletedEpisode = await Episode.findByIdAndDelete(episodeId);
    if (!deletedEpisode) {
      return res.status(404).json({ message: "episodeId not found" });
    }
    res.status(200).json({ message: "episode deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting episode", error });
  }
};
