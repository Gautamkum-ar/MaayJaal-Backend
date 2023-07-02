import mongoose from "mongoose";

const bookmarkModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookmarks", bookmarkModel);
