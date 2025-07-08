import { PrismaClient } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async createUser(userData: { email: string; secret: string }) {
    return this.prisma.user.create({
      data: {
        user_email: userData.email,
        user_secret: userData.secret,
      },
    });
  }

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { user_email: email },
    });
  }

}
