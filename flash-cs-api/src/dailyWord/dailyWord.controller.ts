import { Controller, Get } from '@nestjs/common';
import { DailyWordService } from './dailyWord.service';

@Controller('dailyWord')
export class DailyWordController {
    constructor(private readonly dailyWordService: DailyWordService) { }

    @Get()
    getDailyWord() {
        return this.dailyWordService.getDailyWord();
    }
}
