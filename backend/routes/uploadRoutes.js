import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";
import { authProtect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authProtect,
  allowRoles("instructor", "admin"),
  upload.single("file"),
  uploadFile
);

router.post(
  "/upload",
  authProtect,
  upload.single("file"),
  uploadFile
);


export default router;
