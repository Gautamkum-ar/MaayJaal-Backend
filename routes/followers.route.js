import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { sendFollowRequest } from "../controllers/followers.controller.js";

const FollowRouter = Router();

FollowRouter.post("/follow/:reciverId", checkAuth, sendFollowRequest);

export default FollowRouter;
