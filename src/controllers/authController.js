const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateAccessToken } = require("../utils/authMiddleware");

exports.register = async (req, res) => {
  try {
    const { email, name, mobileNumber, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.json({ message: "Email already registered", success: false });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      mobileNumber,
      password: hashedPassword,
    });
    res.json({
      user: newUser,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);

    res.json({
      message: "Logged in successfully",
      accessToken,
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};
