import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  commentHandler,
  deleteComment,
  getCommentHandler,
} from "../controllers/comment.controller.js";

const CommentRouter = Router();

CommentRouter.get("/getcomment", getCommentHandler);
CommentRouter.post("/comment/:postId", checkAuth, commentHandler);
CommentRouter.delete("/deletecomment/:commentId", checkAuth, deleteComment);

export default CommentRouter;
