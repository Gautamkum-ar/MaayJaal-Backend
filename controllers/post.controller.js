import cloudinaryServices from "../service/cloudinary.services.js";

import posts from "../models/post.models.js";
import likes from "../models/like.model.js";

export const createPost = async (req, res) => {
  const { id } = req.user;
  const { caption, image, isPhoto } = req.body;

  //cheking for image uploaded by user or not
  if (image) {
    try {
      //conveting image into binary format

      const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      // creating link to the user image

      const imageUrl = await cloudinaryServices.uploadFunc(buffer, imagePath);

      const post = new posts({
        userId: id,
        caption,
        isPhoto: imageUrl ? true : false,
        photoUrl: imageUrl,
      });

      const savePost = await post.save();

      const populatePost = await posts
        .findById(savePost._id)
        .populate("userId");

      res.status(200).json({
        success: true,
        message: "Posts Created successfully",
        post: populatePost,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  } else {
    try {
      const post = new posts({
        userId: id,
        caption,
        isPhoto: isPhoto ? true : false,
      });
      const savePost = await post.save();

      const populatePost = await posts
        .findById(savePost._id)
        .populate("userId");

      res.status(200).json({
        success: true,
        message: "Posts Created successfully",
        post: populatePost,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
};

export const getAllPost = async (req, res) => {
  try {
    const findPost = await posts.find().populate("userId").select("-password");
    const like = await likes.find();
    return res.status(200).json({
      message: "Posts Found successfully",
      data: { findPost, like },
    });
  } catch (error) {
    console.log(error);
  }
};

//edit single post

export const editPost = async (req, res) => {
  const { id } = req.user;

  const postId = req.params.postId;

  const { caption, image } = req.body;

  if (!postId) {
    return res.status(404).json({
      message: "post id not provided",
      success: false,
    });
  }

  if (image) {
    try {
      //checking if post is requested user
      const checkUser = await posts.find({ _id: postId, userId: id });

      //conveting image into binary format

      const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      // creating link to the user image

      const imageUrl = await cloudinaryServices.uploadFunc(buffer, imagePath);

      if (!checkUser.length) {
        return res.status(404).json({
          message: "post does not belongs to you",
          success: false,
        });
      }
      const findPost = await posts.findByIdAndUpdate(
        { _id: postId },
        { $set: { caption: caption, photoUrl: imageUrl } },
        { new: true }
      );

      return res.status(200).json({
        message: "post Edited successfully",
        success: true,
        data: findPost,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      //checking if post is requested user
      const checkUser = await posts.find({ _id: postId, userId: id });

      if (!checkUser.length) {
        return res.status(404).json({
          message: "post does not belongs to you",
          success: false,
        });
      }
      const findPost = await posts.findByIdAndUpdate(
        { _id: postId },
        { $set: { caption: caption, photoUrl: "" } },
        { new: true }
      );

      return res.status(200).json({
        message: "post Edited successfully",
        success: true,
        data: findPost,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

// delete a post

export const deletePost = async (req, res) => {
  const { id } = req.user;

  const postId = req.params.postId;

  try {
    const findPost = await posts.find({ _id: postId, userId: id });

    if (!findPost) {
      return res.status(404).res({
        message: "Post does not belongs to you",
        success: false,
      });
    }
    await posts.findByIdAndDelete({ _id: postId, userId: id });
    await likes.findOneAndDelete({ postId: postId }, { userId: id });

    const allpost = await posts.find().populate("userId").select("-password ");

    return res.status(200).json({
      message: "Post Deleted successfully",
      success: true,
      data: allpost,
    });
  } catch (error) {
    console.log(error);
  }
};
