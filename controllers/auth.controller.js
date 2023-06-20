import UserSchema from "../models/user.models.js";
import cloudinaryServices from "../service/cloudinary.services.js";
import { generateToken } from "../service/token.js";

const signUp = async (req, res) => {
  try {
    const { email, password, name,userName } = req.body;

    const isExist = await UserSchema.findOne({ email: email });

    if (isExist) {
      return res.status(409).json({
        message: "User Already exists",
        success: false,
      });
    }
    // const buffer = Buffer.from(
    //   image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    //   "base64"
    // );
    // const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    // const imageUrl = await cloudinaryServices.uploadFunc(buffer, imagePath);

    const user = new UserSchema({
      email,
      password,
      name,
      userName
      // avatar: imageUrl,
    });

    const result = await user.save();

    return res.status(201).json({
      message: "Register Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    //checking user already exist

    const isExist = await UserSchema.findOne({ email: email });

    if (!isExist) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //checking password matching or not

    if (isExist.password !== password) {
      return res.status(400).json({
        message: "Password does not match",
        success: false,
      });
    }

    //login if user exist

    if (isExist) {
      return res.status(200).json({
        message: "Login Success",
        success: true,
        data: {
          encodedToken: generateToken({ id: isExist._id }),
          user: isExist,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signUp, login };
