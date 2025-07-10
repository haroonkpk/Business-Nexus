import Profile from "../models/profile.js";
import User from "../models/User.js";

//  GET Profile by ID
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      "name email role"
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

//  UPDATE Own Profile
export const updateProfile = async (req, res) => {
  try {
    const updated = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
