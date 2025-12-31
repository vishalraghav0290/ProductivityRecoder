import express, { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import upload from "../middleware/multer";

const router = express.Router();

router.post(
  "/",
  upload.single("avatarImage"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;

      if (!file || !file.path) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await cloudinary.uploader.upload(file.path);

      res.status(200).json({
        message: "Uploaded successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Unexpected error while uploading for avatarImage" });
    }
  }
);

export default router;
