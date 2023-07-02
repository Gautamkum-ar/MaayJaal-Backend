import likes from "../models/like.model.js";
import posts from "../models/post.models.js";

export const getLikes = async (req, res) => {
  const { id } = req.user;

  const { postId } = req.params;
  try {
    const like = await likes.findOne({ postId: postId, userId: id });
    const allLikes = await likes.find();

    const likedCount = allLikes.filter(
      (like) => like.postId.toString() === postId.toString()
    ).length;

    if (like) {
      await posts.findByIdAndUpdate(
        { _id: postId },
        {
          $set: {
            likes: likedCount - 1,
            isLiked: false,
          },
        },
        { new: true }
      );

      await likes.findByIdAndDelete(like._id);
      const populatePost = await posts.find().populate("userId");
      const likedata = await likes.find();

      return res.status(200).json({
        message: "Post unliked",
        success: true,
        data: { populatePost, likedata },
      });
    }

    const newLike = new likes({
      userId: id,
      postId,
      isLiked: true,
    });

    await newLike.save();

    await posts.findByIdAndUpdate(
      { _id: postId },
      {
        $set: {
          likes: likedCount + 1,
          isLiked: true,
        },
      },
      { new: true }
    );

    const populatePost = await posts.find().populate("userId");
    const likedata = await likes.find();
    res.status(200).json({
      message: "Liked succcess",
      success: true,
      data: { populatePost, likedata },
    });
  } catch (error) {
    console.log(error);
  }
};
