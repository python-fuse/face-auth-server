import e, { Router } from "express";
import upload from "../middleware/uploadHandler";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), (req, res) => {
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
});

export default uploadRouter;
