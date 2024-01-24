import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsFile } from 'nestjs-form-data';

export class Prompt {
  @IsNotEmpty()
  @IsString()
  articleStatus: boolean;
  @IsNotEmpty()
  @IsString()
  articleLevel: string;
  @IsNotEmpty()
  @IsString()
  articleTheme: string;
  @IsNotEmpty()
  @IsString()
  articleContent: string;
}
