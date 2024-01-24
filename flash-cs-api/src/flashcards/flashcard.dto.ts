import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsFile } from 'nestjs-form-data';

export class CreateFlashcard {
  @IsNotEmpty()
  @IsString()
  vocabulary: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  deckId: string;
  @IsOptional()
  @IsString()
  notes?: string;
}
export class UpdateFlashcard {
  @IsNotEmpty()
  @IsString()
  vocabulary: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  deckId: string;
  @IsOptional()
  @IsString()
  notes?: string;

  isImageDeleted: string;
}
