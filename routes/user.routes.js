import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { editProfile, porfile } from "../controllers/user.controller.js";

const ProfileRoutes = express.Router();

ProfileRoutes.get("/profile", checkAuth, porfile);
ProfileRoutes.post("/editProfile", checkAuth, editProfile);

export default ProfileRoutes;
