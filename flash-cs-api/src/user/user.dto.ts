import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsFile } from 'nestjs-form-data';

export class UserInfo {
  @IsNotEmpty()
  @IsString()
  englishLevel: string;
  @IsNotEmpty()
  @IsNumber()
  dailyExercise: number;

  @IsNotEmpty()
  @IsNumber()
  dailyWord: number;
}
export class AllUserInfo {
  id: number;
  email: string;
  password: string;
  nickname: string;
  articleChance: string;
  englishLevel: string;
  createdAt: Date;
  updatedAt: Date;
  targets: {
    dailyExercise: number;
    dailyWord: number;
  };
}
