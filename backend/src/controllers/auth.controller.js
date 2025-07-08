import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = new User({
      username,
      email,
      password,
    });
    generateToken(user._id, res);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  const userExists =await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) {
   return res.status(400).json({ message: "password incorrect" });
  }
  try {
    generateToken(userExists._id, res);
    res.status(201).json({
      _id: userExists._id,
      username: userExists.username,
      email: userExists.email
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "",{maxAge: 0 })
    res.status(201).json({message: "User sucsissfully "});
  } catch(error){
    res.status(500).json({massege: "error in logout route"})
  }
};

export const checkAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      userId:user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt

    })
  } catch (error) {
    res.status(500).json({ message: "Server error in checkAuth Route" });
  }
};
