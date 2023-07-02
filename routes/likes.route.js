import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { getLikes } from "../controllers/like.controller.js";

const LikeRouter = Router();

LikeRouter.put("/likes/:postId", checkAuth, getLikes);

export default LikeRouter;
