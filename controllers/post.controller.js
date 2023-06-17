import UserSchema from "../models/user.models.js";
import posts from "../models/post.models.js";

export const createPost = async (req, res) => {
  const { id } = req.user;
  const { caption, photoUrl, isPhoto } = req.body;

  const post = new posts({
    userId: id,
    caption,
    isPhoto: isPhoto ? true : false,
    photoUrl,
  });

  try {
    const savePost = await post.save();

    const populatePost = await posts
      .findById(savePost._id)
      .populate("userId", "name avatar");

    res.status(200).json({
      success: true,
      message: "Posts Created successfully",
      post: {
        ...savePost._doc,
        userId: populatePost.userId._id,
        useName: populatePost.userId.name,
        avatar: populatePost.userId.avatar,
        isBookMarked: false,
        likes: {
          count: 0,
          isLiked: false,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const findPost = await posts.find().populate("userId").select("-password ");

    return res.status(200).json({
      message: "Posts Found successfully",
      data: findPost,
    });
  } catch (error) {
    console.log(error);
  }
};
