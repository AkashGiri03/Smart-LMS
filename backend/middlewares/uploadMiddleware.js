import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "video/mp4",
    "video/mpeg",
    "video/quicktime", // .mov
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only video, PDF, and image files are allowed."
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter,
});
