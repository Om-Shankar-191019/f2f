import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { isEmail } from "../utils/utilities.js";

export const signup = async (req, res, next) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exist.");
    }

    if (password !== confirmPassword) {
      throw new Error("Password and Confirm Password does not match");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // const randomPic = gender === "male" ? boyProfilePic : girlProfilePic;
    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashPassword,
      gender,
      profilePic,
    });

    let tokenExpirationDate;
    if (newUser) {
      tokenExpirationDate = generateToken(newUser._id, res);
    }
    res.status(201).json({
      _id: newUser._id,
      fullName,
      username,
      email,
      gender,
      profilePic,
      tokenExpirationDate,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { usernameOrMail, password } = req.body;
    const isMail = isEmail(usernameOrMail);

    let user;
    if (isMail) {
      user = await User.findOne({ email: usernameOrMail });
      if (!user) {
        user = await User.findOne({ username: usernameOrMail });
      }
    } else {
      user = await User.findOne({ username: usernameOrMail });
    }

    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    const tokenExpirationDate = generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      gender: user.gender,
      profilePic: user.profilePic,
      tokenExpirationDate,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
