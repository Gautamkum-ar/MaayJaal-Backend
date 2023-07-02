import bookmarks from "../models/bookmark.model.js";

export const addToBookMark = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;

  try {
    const findBookMark = await bookmarks.find({ userId: id, postId: postId });

    if (findBookMark.length > 0) {
      await bookmarks.findOneAndDelete({ userId: id, postId: postId });
      const bookmarkData = await bookmarks.find().populate("postId");
      return res.status(200).json({
        message: "Post remove from bookmarks",
        success: false,
        data: bookmarkData,
      });
    } else {
      const newBookmark = new bookmarks({
        postId: postId,
        userId: id,
      });

      await newBookmark.save();

      const allBookmarks = await bookmarks.find().populate("postId");

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
