import { Request, Response } from "express";
import userService from "../services/user.service";
import faceService from "../services/face.service";
import { log } from "console";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();

    res
      .status(200)
      .json({
        users,
        message: "Users fetched successfully",
      })

      .send();
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      user,
      message: "User fetched successfully",
    });
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, admissionNumber } = req.body;

    const dbUser = await userService.getUserByAdmissionNumber(admissionNumber);

    if (dbUser) {
      res.status(400).json({ message: "User already exist!" });
    }

    const faceData = await faceService.extractFaceData(
      req?.file?.path as string
    );

    if (!faceData) {
      res.status(400).json({ message: "Face data extraction failed" });
      return;
    }

    const newUser = await userService.createUser({
      name,
      email,
      admissionNumber,
      faceData,
      faceSample: req.file?.path!,
    });

    res.status(201).json({
      user: { ...newUser, faceData: undefined },
      message: "User created successfully",
    });
  }

  async verifyUser(req: Request, res: Response): Promise<void> {
    const { admissionNumber } = req.body;

    const user = await userService.getUserByAdmissionNumber(admissionNumber);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const filePath = req?.file?.path as string;

    if (!filePath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const isMatch = await faceService.compareFaces(user.faceData, filePath);

    if (isMatch) {
      res.status(200).json({ message: "User verified successfully", user });
    } else {
      res.status(401).json({ message: "Face does not match" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    res.status(200).json({ message: "User deleted successfully" });
  }
}

export default new UserController();
