import JWT from "jsonwebtoken";
import User from "../models/Users.js";
import { throwError } from "../utils/errorHandler.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throwError("please login", 401);
    }

    const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
