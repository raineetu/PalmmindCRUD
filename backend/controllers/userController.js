import { User } from "../models/userModels.js";
import bcrypt from "bcryptjs";

// Signup function for user registration
export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      console.log("Validation failed: Email already exists");
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully");
    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Prepare user data for response
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.status(200).json({
      message: `Welcome back ${user.username}`,
      user: userData,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

// Update user profile function
export const updateProfile = async (req, res) => {
    const { userId, username, email, password } = req.body;
  
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          ...(username && { username }),
          ...(email && { email }),
          ...(hashedPassword && { password: hashedPassword }),
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Delete user data
export const deleteUser = async (req, res) => {
    const { userId } = req.params; // Extract userId from the request body
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Reset password function
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
