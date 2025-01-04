import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import Shelter from "../models/shelterModel.js";

// User Authentication Middleware
export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

// Shelter Authentication Middleware
export const authShelterMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.shelter = await Shelter.findById(decoded.userId).select("-password");
      if (!req.shelter) {
        return res.status(404).json({ message: "Shelter not found" });
      }
      console.log('Shelter authenticated:', req.shelter); // Add this log
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

// Shelter Authorization Check
export const authShelter = (req, res, next) => {
  if (req.shelter && req.shelter.isShelter) {
    return next();
  } else {
    return res.status(403).json({ message: "Not authorized as Shelter" });
  }
};
