import { User } from "@prisma/client";
import prisma from "../utils/prisma";

class UserService {
  async getAllUsers() {
    return prisma.user.findMany();
  }
  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByAdmissionNumber(admissionNumber: string) {
    return prisma.user.findUnique({ where: { admissionNumber } });
  }

  async createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return prisma.user.create({ data: user });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
