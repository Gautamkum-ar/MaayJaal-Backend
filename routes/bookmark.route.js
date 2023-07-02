import { Router } from "express";
import {
  addToBookMark,
  getAllBookMark,
} from "../controllers/bookmark.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

const BookMarkRouter = Router();

BookMarkRouter.post("/bookmark", checkAuth, addToBookMark);
BookMarkRouter.get("/getbookmark", checkAuth, getAllBookMark);

export default BookMarkRouter;
