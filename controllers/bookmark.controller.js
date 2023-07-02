import bookmarks from "../models/bookmark.model.js";

export const addToBookMark = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;
  console.log(id);
  console.log(postId);

  try {
    const findBookMark = await bookmarks.find({ userId: id, postId: postId });
    if (findBookMark.length > 0) {
      return res.status(409).json({
        message: "Post already exits in bookmarks",
        success: false,
      });
    } else {
      const newBookmark = new bookmarks({
        postId: postId,
        userId: id,
      });

      await newBookmark.save();

      const allBookmarks = await bookmarks.find();

      console.log(allBookmarks);

      return res.status(200).json({
        message: "Post bookmark successfully",
        success: true,
        data: allBookmarks,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookMark = async (req, res) => {
  const { id } = req.user;

  try {
    const findbookMark = await bookmarks
      .find({ userId: id })
      .populate("postId");

    return res.status(200).json({
      message: "Bookmark Fetch successfully",
      success: true,
      data: findbookMark,
    });
  } catch (error) {
    console.log(error);
  }
};
