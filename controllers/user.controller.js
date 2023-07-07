import UserSchema from "../models/user.models.js";
import cloudinaryServices from "../service/cloudinary.services.js";
import followers from "../models/followers.model.js";

// user controller

const porfile = async (req, res) => {
  const { id } = req.user;
  try {
    //finding user in schema
    const user = await UserSchema.findById(id).select(
      "-__v -createdAt -updatedAt -password"
    );

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        success: false,
      });
    }

    //sending response if user found
    const follower = await followers.find();
    return res.status(200).json({
      message: "user found",
      success: true,
      data: { user, follower },
    });
  } catch (error) {
    console.log(error);
  }
};

// uapdating profile
//method post

const editProfile = async (req, res) => {
  const { id } = req.user;

  const { name, bio, image, userName, avatar,portFolioLink } = req.body;


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

      //finding for user to present in data base and updating

      const foundUser = await UserSchema.findByIdAndUpdate(
        { _id: id },
        { $set: { name, bio, avatar: imageUrl, userName: userName,portfolio:portFolioLink } },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        data: foundUser,
      });
    } catch (error) {
      return res.json(error);
    }
  } else {
    const foundUser = await UserSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { name, bio, userName, avatar,portfolio:portFolioLink } },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: foundUser,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const findAllUsers = await UserSchema.find();

    return res.status(200).json({
      message: `${findAllUsers.length} users are found in database`,
      success: true,
      data: findAllUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export { porfile, editProfile, getAllUser };
