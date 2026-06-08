import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendMail.js";
import { throwError } from "../utils/errorHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
} from "../utils/generateToken.js";
import JWT from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      throwError("User already exists", 401);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      success: true,
      message: "User created",
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throwError("No user found", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throwError("Invalid Password", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throwError("No token found", 403);
    }
    let decode;
    try {
      decode = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throwError("Invalid Token", 403);
    }
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    const newAccessToken = JWT.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
    );
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    success: true,
    message: "Successfully logout",
  });
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throwError("Please enter password", 400);
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      throwError("No user found", 403);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throwError("Invalid Password", 400);
    }

    if (oldPassword === newPassword) {
      throwError("Same password. Enter Different password", 400);
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been successfully changed",
    });
  } catch (error) {
    next(error);
  }
};

export const changeProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      throwError("Please fill up all fields", 400);
    }

    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      throwError("Email already exists", 400);
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      throwError("No user found", 404);
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      throwError("Enter email", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throwError("no user found", 404);
    }
    const resetToken = generateResetToken(user);
    const resetUrl = `http://localhost:5173/api/reset-password/${resetToken}`;
    const html = `
  <h2>Password Reset</h2>
  <p>Click the link below to reset your password:</p>
  <a href="${resetUrl}">Reset Password</a>
`;
    await sendEmail(user.email, "Password Reset", html);
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword?.trim()) {
      throwError("Please enter password", 400);
    }

    const token = req.params.token;

    let decoded;

    try {
      decoded = JWT.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (error) {
      throwError("Invalid or expired token", 400);
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throwError("No user found", 404);
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
