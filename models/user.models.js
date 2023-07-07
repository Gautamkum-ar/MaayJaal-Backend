import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dtswa0rzu/image/upload/v1649933676/monkey-avatar_nbyc1i.png",
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dtswa0rzu/image/upload/v1650196033/talkline_default_cover.png",
    },
    bio: {
      type: String,
      default: "Hi there in using MaayaJaal",
    },
    portfolio: {
      type: String,
      default: "",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
