import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ArticleService } from './article.service';
import { Article, UserArticleExercise } from './article.dto';
import { ChatGPTService } from 'src/chatgpt/chatGPT.service';
import { Prompt } from 'src/chatgpt/chatGPT.dto';
import { Exercise } from '@prisma/client';
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly chatgptService: ChatGPTService,
  ) {}
  @Get('/')
  @UseGuards(JwtGuard)
  getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @Get('specificArticle/:itemId')
  @UseGuards(JwtGuard)
  async getSpecificArticle(
    @GetUser('id') userId: number,
    @Param('itemId') id: number,
  ) {
    const articleResp = await this.articleService.getQuestionArticle(id);
    const rebuiltArticleResp = {
      ...articleResp,
      exercises: articleResp.exercises.map(
        ({ correctAnswer, ...exercise }) => exercise,
      ),
    };
    return rebuiltArticleResp;
  }
  @Post('specificArticleAnswer/:itemId')
  @UseGuards(JwtGuard)
  async getSpecificArticleAnswer(
    @GetUser('id') userId: number,
    @Param('itemId') id: number,
    @Body('answer') answer: number[],
  ) {
    const articleResp = await this.articleService.getQuestionArticle(id);
    const correctAnswers = articleResp.exercises.map(
      (exercise) => exercise.correctAnswer,
    );
    const AnswersIds = articleResp.exercises.map((exercise) => exercise.id);
    const corrections = correctAnswers.map((correctAnswer, index) => {
      const result = correctAnswer === answer[index];
      const arrayOption = ['A', 'B', 'C', 'D'];
      const resultValue = result
        ? `Answer is true`
        : `Answer is wrong, the correct answer is ${arrayOption[correctAnswer]}`;

      return resultValue;
    });
    const answerCompares = correctAnswers.map((correctAnswer, index) => {
      const result = correctAnswer === answer[index];
      return result;
    });

    const InputArticleExercise: UserArticleExercise[] = AnswersIds.map(
      (AnswersId, index) => {
        return {
          exerciseId: AnswersId,
          userAnswer: answer[index],
          isCorrect: answerCompares[index],
        };
      },
    );
    // console.log(InputArticleExercise);
    const input = await this.articleService.postUserArticleExercise(
      userId,
      id,
      InputArticleExercise,
    );
    // await this.articleService.postUserArticleExercise(userId, id);
    // for (let n = 0; n < AnswersIds.length; n++) {
    //   await this.articleService.postUserExercise(
    //     AnswersIds[n],
    //     id,
    //     answer[n],
    //     answerCompares[n],
    //   );
    // }
    return corrections;
  }
  @Get('user')
  @UseGuards(JwtGuard)
  getUserInfo(@GetUser('id') userId: number) {
    return this.articleService.getUserInfo(userId);
  }
  @Post('gptgen')
  @UseGuards(JwtGuard)
  async postArticle(
    @GetUser('id') userId: number,
    @Body('articleTheme') articleTheme: string,
  ) {
    const userInfo = await this.articleService.getUserInfo(userId);

    // const [userInfoInput] = userInfo
    const prompt: Prompt = {
      articleStatus: true,
      articleLevel: userInfo.englishLevel,
      articleTheme: articleTheme,
      articleContent: '',
    };

    prompt.articleContent = await this.chatgptService.callChatGPT(prompt);
    const question = await this.chatgptService.callChatGPT(prompt);
    const articleJson: Article = JSON.parse(prompt.articleContent);

    const questionJson: Exercise = JSON.parse(question);

    return await this.articleService.postArticle(
      userInfo.englishLevel,
      articleTheme,
      articleJson.article,
      userInfo.nickname,
      questionJson,
    );
    // }
  }

  //   @Post('formSubmit')
  //   @UseGuards(JwtGuard)
  //   async handleFormData(
  //     image: Express.Multer.File,
  //     @Body() data: Article,
  //     @GetUser('id') userId: number,
  //   ) {
  //     return this.articleService.createArticle(data, userId);
  //   }

  //   @Delete('/:dataId')
  //   @UseGuards(JwtGuard)
  //   async DeleteData(
  //     @GetUser('id') userId: number,
  //     @Param('dataId') dataId: number,
  //   ) {
  //     return this.articleService.deleteArticle(userId, dataId);
  //   }
}
