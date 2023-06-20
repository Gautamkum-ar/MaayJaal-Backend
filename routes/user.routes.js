import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  editProfile,
  getAllUser,
  porfile,
} from "../controllers/user.controller.js";

const ProfileRoutes = express.Router();

ProfileRoutes.get("/profile", checkAuth, porfile);
ProfileRoutes.post("/editProfile", checkAuth, editProfile);
ProfileRoutes.get("/getallusers", getAllUser);

export default ProfileRoutes;
