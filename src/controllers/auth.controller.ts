import authService from "../services/auth.service";
import { Request, Response } from "express";
import userService from "../services/user.service";
import faceService from "../services/face.service";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, admissionNumber } = req.body;

    const dbUser = await userService.getUserByAdmissionNumber(admissionNumber);

    if (dbUser) {
      res.status(400).json({ message: "User already exists, Please Login" });
      return;
    }

    const faceImg = req?.file?.path;

    if (!faceImg) {
      res.status(400).json({ message: "No Image Uploaded" });
      return;
    }

    const faceData = await faceService.extractFaceData(faceImg);

    const newUser = await authService.register({
      name,
      admissionNumber,
      faceData,
      email,
      faceSample: faceImg,
    });

    res.status(201).json(newUser);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { admissionNumber } = req.body;

    const imagePath = req.file?.path;

    const dbUser = await userService.getUserByAdmissionNumber(admissionNumber);

    if (!dbUser) {
      res.status(400).json({ message: "User not found, please register" });
      return;
    }

    if (!imagePath) {
      res.status(400).json({ message: "No image uploaded" });
      return;
    }

    try {
      const loginUser = await authService.login(dbUser, imagePath);
      res.status(200).json(loginUser);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
      return;
    }
  }
}

export default new AuthController();
