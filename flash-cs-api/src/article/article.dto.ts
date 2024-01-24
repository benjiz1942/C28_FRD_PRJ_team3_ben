import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsFile } from 'nestjs-form-data';

export class Article {
  title: string;
  article: string;
}
export class Exercise {
  data: [
    {
      question: string;

      options: [string];

      correctAnswer: number;
    },
  ];
}
export class UserArticleExercise {
  exerciseId: number;

  userAnswer: number;

  isCorrect: boolean;
}
