import jwt from "jsonwebtoken";
import Profile from "../models/profile.js";


export const protectedRoute = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    const profile = await Profile.findOne({ user: decodedToken.id });
    req.user.profileId = profile?._id || null;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};
