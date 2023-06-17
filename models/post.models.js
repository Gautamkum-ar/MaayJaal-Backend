import mongoose from "mongoose";

const NewPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    caption: {
      type: String,
      required: true,
    },
    isPhoto: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      likeCount: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", NewPostSchema);
