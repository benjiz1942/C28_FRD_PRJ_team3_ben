import { Module } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  providers: [FlashcardsService, AppService],
  controllers: [FlashcardsController],
})
export class FlashcardsModule {}
