import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  createPost,
  deletePost,
  editPost,
  getAllPost,
} from "../controllers/post.controller.js";

const PostRoutes = express.Router();

PostRoutes.post("/createpost", checkAuth, createPost);
PostRoutes.get("/getallpost", getAllPost);
PostRoutes.put("/editpost/:postId", checkAuth, editPost);
PostRoutes.delete("/deletepost/:postId", checkAuth, deletePost);

export default PostRoutes;
