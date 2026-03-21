import bcrypt from 'bcryptjs';
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import {generateAccessToken,generateRefreshToken } from "../helpers/tokenHelper.js"
import {sendMail} from "../helpers/mailHelper.js"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role,location,contactInfo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

     const validRoles = ["adopter", "shelter", "foster"];
     if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
     }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, passwordHash: hashedPassword, role,location,contactInfo });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
    await sendMail({
    to: user.email,
    subject: "Welcome to Pet Adoptation",
    htmlContent: `<h2>Welcome ${user.name}</h2><p>Your account created successfully.</p>`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken,user: { _id: user._id,name: user.name,email: user.email,role: user.role,} });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({ _id: decoded.id, role: decoded.role });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};



