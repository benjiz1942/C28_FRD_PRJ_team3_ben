import { Module } from '@nestjs/common';
import { DailyWordService } from './dailyWord.service';
import { DailyWordController } from './dailyWord.controller';

@Module({
    providers: [DailyWordService],
    controllers: [DailyWordController]
})

export class DailyWordModule { }
