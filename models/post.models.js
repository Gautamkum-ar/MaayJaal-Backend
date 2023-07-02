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
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", NewPostSchema);
