import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import cors from "cors";

import "./database/initial.js";
import AuthRoutes from "./routes/auth.route.js";
import ProfileRoutes from "./routes/user.routes.js";
import PostRoutes from "./routes/post.route.js";
import LikeRouter from "./routes/likes.route.js";
import CommentRouter from "./routes/comments.route.js";
import FollowRouter from "./routes/followers.route.js";
import BookMarkRouter from "./routes/bookmark.route.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser({ limit: "50mb" }));

app.use(express.json());

const port = 4848;

app.use("/api/maaya", AuthRoutes);
app.use("/api/maaya", ProfileRoutes);
app.use("/api/maaya", PostRoutes);
app.use("/api/maaya", LikeRouter);
app.use("/api/maaya", CommentRouter);
app.use("/api/maaya", FollowRouter);
app.use("/api/maaya", BookMarkRouter);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
