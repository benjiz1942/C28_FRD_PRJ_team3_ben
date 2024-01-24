import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSelfInfo(userId: number) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return foundUser;
  }
  async putSelfTarget(
    englishLevel: string,
    userId: number,
    dailyExercise: number,
    dailyWord: number,
  ) {
    const userTarget = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        englishLevel: englishLevel,
        targets: {
          update: { dailyExercise: dailyExercise, dailyWord: dailyWord },
        },
      },
    });
    return userTarget;
  }
  async getSelfTarget(userId: number) {
    const foundUser = await this.prismaService.user.findMany({
      where: { id: userId },
      include: {
        targets: { select: { dailyExercise: true, dailyWord: true } },
      },
    });
    return foundUser;
  }
}
