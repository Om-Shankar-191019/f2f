import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new Error("Unauthorized - Token not found!");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      throw new Error("Unauthorized - Token invalid");
    }

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;
