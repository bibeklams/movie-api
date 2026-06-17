import { throwError } from "../utils/errorHandler.js";

const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      throwError("Please login", 401);
    }
    if (req.user.role !== "admin") {
      throwError("Admin access required", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default adminOnly;
