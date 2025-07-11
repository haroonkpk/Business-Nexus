import Profile from "../models/profile.js";
import User from "../models/user.model.js";
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.id }).populate(
      "user"
    );

    // Profile not found, return user info only
    if (!profile) {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });

      // Send minimal profile with empty fields
      return res.json({
        user,
      });
    }

    // Profile found
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

//  UPDATE Own Profile
export const updateProfile = async (req, res) => {

  try {
    const updated = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
