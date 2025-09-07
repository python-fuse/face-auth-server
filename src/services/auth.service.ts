import { User } from "@prisma/client";
import userService from "./user.service";
import faceService from "./face.service";
import JWTService from "./jwt.service";

class AuthService {
  async register(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const { admissionNumber } = userData;

    const dbUser = await userService.getUserByAdmissionNumber(admissionNumber);

    if (dbUser) {
      throw new Error("User already exist!");
    }

    const newUser = await userService.createUser(userData);

    const token = JWTService.generateToken({
      id: newUser.id,
      admissionNumber: newUser.admissionNumber,
    });

    return { user: newUser, token, message: "Registration successful" };
  }

  async login(user: User, uploadedFace: string) {
    const isMatch = await faceService.compareFaces(user.faceData, uploadedFace);

    if (!isMatch) {
      throw new Error("Face does not match");
    }

    const token = JWTService.generateToken({
      id: user.id,
      admissionNumber: user.admissionNumber,
    });

    return { user: user, token, message: "Login successful" };
  }
}

export default new AuthService();
