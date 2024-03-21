import jwt from "jsonwebtoken";
import {User} from "../models/User.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).send("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      res.status(401).send("Invalid access Token!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid access token");
  }
};
