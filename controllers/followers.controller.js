import followers from "../models/followers.model.js";

export const sendFollowRequest = async (req, res) => {
  const { id } = req.user;
  const { reciverId } = req.params;

  try {
    const findFriend = await followers.find({
      $or: [
        {
          senderId: id,
          reciverId: reciverId,
        },
        { reciverId: id, senderId: reciverId },
      ],
    });

    if (!findFriend.length > 0) {
      const newFollower = new followers({
        senderId: id,
        reciverId: reciverId,
      });
      await newFollower.save();
      const follower = await followers.find();

      res.status(200).json({
        message: "Follow success",
        success: true,
        data: follower,
      });
    } else {
      await followers.findOneAndDelete({
        $or: [
          {
            senderId: id,
            reciverId: reciverId,
          },
          { reciverId: id, senderId: reciverId },
        ],
      });
      const follower = await followers.find();
      res.status(200).json({
        message: "Unfollow success",
        success: true,
        data: follower,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
