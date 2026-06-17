import JWT from "jsonwebtoken";
import User from "../models/Users.js";
import { throwError } from "./errorHandler.js";
export const generateAccessToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    },
  );
};

export const generateRefreshToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );
};
export const generateResetToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.RESET_PASSWORD_SECRET,
    {
      expiresIn: "15m",
    },
  );
};
