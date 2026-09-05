import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) { return { id: user._id, name: user.name, email: user.email, role: user.role }; }

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: "Name, email, and a password of at least 8 characters are required" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ message: "Email or password is incorrect" });
    res.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
}