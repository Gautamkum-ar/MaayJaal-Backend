import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { createPost, getAllPost } from "../controllers/post.controller.js";

const PostRoutes = express.Router();

PostRoutes.post("/createpost", checkAuth, createPost);
PostRoutes.get("/getallpost", getAllPost);

export default PostRoutes;
