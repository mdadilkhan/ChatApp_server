const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Field is required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      hashedPassword,
      isSocialLogin: false,
    });

    const result = await user.save();

    return res
      .status(200)
      .json({ message: "User Register successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All filed is required" });
    }

    const user = await User.findOne({ email, provider: "manual" });
    if (!user || user?.isSocialLogin) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  
    return res.status(200).json({ message: "Login Success"});
  } catch (err) {
    console.log(err);
  }
};

const socialLogin = async (req, res) => {
  try {
    const { name, email, provider } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    let user = await User.findOne({ email, provider });

    if (!user) {
      // Create new user without password
      user = await User.create({
        name,
        email,
        isSocialLogin: true, // Mark as social login
        provider, // google or github
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.status(200).json({ message: "Login successful"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  socialLogin,
};
