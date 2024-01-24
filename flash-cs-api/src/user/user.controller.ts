import { UserService } from './user.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { AllUserInfo, UserInfo } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getSelfInfo(@GetUser('id') userId: number) {
    return await this.userService.getSelfInfo(userId);
  }
  @Put('target')
  @UseGuards(JwtGuard)
  async putSelfTarget(
    @GetUser('id') userId: number,
    @Body() { englishLevel, dailyExercise, dailyWord }: UserInfo,
  ) {
    return await this.userService.putSelfTarget(
      englishLevel,
      userId,
      dailyExercise,
      dailyWord,
    );
  }
  @Get('target')
  @UseGuards(JwtGuard)
  async getSelfTarget(@GetUser('id') userId: number) {
    const allInf = await this.userService.getSelfTarget(userId);
    const result = {
      nickname: allInf[0].nickname,
      englishLevel: allInf[0].englishLevel,
      dailyExercise: allInf[0].targets.dailyExercise,
      dailyWord: allInf[0].targets.dailyWord,
    };
    return result;
  }
}
