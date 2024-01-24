import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { PrismaModule } from './prisma/prisma.module';
import { DecksModule } from './decks/decks.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DailyWordModule } from './dailyWord/dailyWord.module';
import { SignupModule } from './signup/signup.module';
import { ArticleModule } from './article/article.module';
import { ChatGPTModule } from './chatgpt/chatGPT.module';
import { StudyNowModule } from './study-now/studyNow.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Specify the destination folder where files will be saved
    }),
    ChatGPTModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    FlashcardsModule,
    PrismaModule,
    AuthModule,
    DecksModule,
    UserModule,
    DailyWordModule,
    SignupModule,
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StudyNowModule,
    DashboardModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
