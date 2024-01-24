import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    nickname: string;
    englishLevel: string;
    password: string
}