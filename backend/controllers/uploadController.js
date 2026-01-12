import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { type } = req.body; // video | pdf | avatar

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 Decide resource type & folder
    let resourceType = "raw";
    let folder = "lms/files";

    if (type === "video") {
      resourceType = "video";
      folder = "lms/videos";
    }

    if (type === "avatar") {
      resourceType = "image";
      folder = "lms/avatars";
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: resourceType,
            folder,
            transformation:
              type === "avatar"
                ? [{ width: 300, height: 300, crop: "fill" }]
                : undefined,
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
