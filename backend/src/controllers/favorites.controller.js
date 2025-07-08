import Story from "../models/story.models.js";
import User from "../models/user.model.js";

export const addToFavorites = async (req, res) => {
  const story = await Story.findById(req.params.storyId);
  if (!story) {
    return res.status(404).json({ message: "story not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Unauthorized" });
  }

  try {
    const alreadyExists = user.addToFavorites.some(
      (item) => item.story.toString() === story._id.toString()
    );

    if (!alreadyExists) {
      user.addToFavorites.push({ story: story._id });
      await user.save();
      res.status(201).json({ message: "Story added to favorites" });
    } else {
      res.status(400).json({ message: "Already in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "error in adding to favorites", error });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "addToFavorites.story",
      populate: {
        path: "type",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Unauthorized" });
    }

    res
      .status(200)
      .json({
        message: "Fetched favorite stories",
        favorites: user.addToFavorites,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};

export const deleteFavorites = async (req, res) => {
  const { storyId } = req.body;

  if (!storyId) {
    return res.status(404).json({ message: "storyId not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Unauthorized" });
  }
  try {
    user.addToFavorites = user.addToFavorites.filter(
      (item) => item.story && item.story.toString() !== storyId
    );
    await user.save();
    res.status(200).json({ message: "Story deleted from favorites" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting to favorites", error });
  }
};
