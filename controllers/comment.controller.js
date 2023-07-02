import posts from "../models/post.models.js";
import comments from "../models/comment.model.js";

export const commentHandler = async (req, res) => {
  const { id } = req.user;
  const { comment } = req.body;
  const { postId } = req.params;

  try {
    const findpost = await posts.find({ _id: postId });
    if (findpost) {
      const newComment = new comments({
        userId: id,
        postId,
        comment,
      });

      await newComment.save();
      const allcomment = await comments.find().populate("userId");
      res.json({
        message: "commented successfully",
        success: true,
        data: allcomment,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCommentHandler = async (req, res) => {
  try {
    const findAllComment = await comments.find().populate("userId");

    return res.status(200).json({
      message: "Comments fetch successfully",
      success: true,
      data: findAllComment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.user;
  const { commentId } = req.params;

  try {
    const findComment = await comments.find({ _id: commentId, userId: id });

    if (findComment) {
      await comments.findByIdAndDelete({ _id: commentId });

      const afterDelete = await comments.find().populate("userId");
      return res.status(200).json({
        message: "Comment deleted successfully",
        success: true,
        data: afterDelete,
      });
    } else {
      return res.status(404).json({
        message: "Comment does not belongs to you",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
