import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsersExceptMe = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(allUsersExceptMe);
  } catch (error) {
    next(error);
  }
};

export const getSearchedUsers = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const loggedInUserId = req.user._id;
    const users = await User.find({
      fullName: { $regex: searchTerm, $options: "i" },
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
