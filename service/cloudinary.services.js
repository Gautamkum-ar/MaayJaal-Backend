import cloudinary from "cloudinary";

class Cloudinary {
  async uploadFunc(image, path) {
    cloudinary.config({
      cloud_name: "dbrpnkzsx",
      api_key: "687589589569359",
      api_secret: "jZiTDxYA5h514lcl6Ouq1U5ma8k",
    });

    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: "image",
            public_id: path,
            format: "png",
          },
          (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        )
        .end(image);
    });
    return result.secure_url;
  }
}

export default new Cloudinary();
