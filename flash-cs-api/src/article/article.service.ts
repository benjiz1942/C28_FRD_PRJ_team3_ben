import { Injectable } from '@nestjs/common';
import { Exercise } from '@prisma/client';
import { Prompt } from 'src/chatgpt/chatGPT.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserArticleExercise } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllArticles() {
    const originalGetAllArticles = await this.prisma.article.findMany({
      select: {
        id: true,
        articleTheme: true,
        articleLevel: true,
        creator: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return originalGetAllArticles;
  }

  async getQuestionArticle(dataId: number) {
    const numberDataId = Number(dataId);
    const questionArticles = await this.prisma.article.findMany({
      where: { id: numberDataId },
      include: {
        exercises: {
          select: {
            id: true,
            question: true,
            option0: true,
            option1: true,
            option2: true,
            option3: true,
            correctAnswer: true,
          },
        },
      },
    });

    return questionArticles[0];
  }
  async getUserInfo(userId: number) {
    const originalGetSpecificArticles = await this.prisma.user.findMany({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        englishLevel: true,
      },
    });
    return originalGetSpecificArticles[0];
  }
  async postArticle(
    articleLevel: string,
    articletheme: string,
    content: string,
    creator: string,
    exercise: Exercise,
  ) {
    const postArticles = await this.prisma.article.create({
      data: {
        articleTheme: articletheme,
        articleLevel: articleLevel,
        content: content,
        creator: creator,
        exercises: {
          createMany: {
            data: [
              {
                question: exercise[0].question,
                option0: exercise[0].options[0],
                option1: exercise[0].options[1],
                option2: exercise[0].options[2],
                option3: exercise[0].options[3],
                correctAnswer: exercise[0].answer,
              },
              {
                question: exercise[1].question,
                option0: exercise[1].options[0],
                option1: exercise[1].options[1],
                option2: exercise[1].options[2],
                option3: exercise[1].options[3],
                correctAnswer: exercise[1].answer,
              },
              {
                question: exercise[2].question,
                option0: exercise[2].options[0],
                option1: exercise[2].options[1],
                option2: exercise[2].options[2],
                option3: exercise[2].options[3],
                correctAnswer: exercise[2].answer,
              },
            ],
          },
        },
      },
    });
    return postArticles;
  }

  async postUserArticleExercise(
    userId: number,
    userArticleId: number,
    userArticleExercise: UserArticleExercise[],
  ) {
    const numberUserArticleId = Number(userArticleId);
    const postUserArticles = await this.prisma.userArticle.create({
      data: {
        userId: userId,
        articleId: numberUserArticleId,
        isFinished: true,

        userArticleExercise: {
          createMany: {
            data: userArticleExercise,
          },
        },
      },
    });
    return postUserArticles;
  }

  async postUserExercise(
    exerciseId: number,
    userArticleId: number,
    userAnswer: number,
    isCorrect: boolean,
  ) {
    const numberUserArticleId = Number(userArticleId);
    const postUserArticles = await this.prisma.userArticleExercise.create({
      data: {
        exerciseId: exerciseId,
        userArticleId: numberUserArticleId,
        userAnswer: userAnswer,
        isCorrect: isCorrect,
      },
    });
    return postUserArticles;
  }
}
// userArticleExercise:
// create: {
//   exerciseId: exerciseId,
//   userArticleId: numberUserArticleId,
//   userAnswer: userAnswer,
//   isCorrect: isCorrect,
// },
