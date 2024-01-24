import { Body, Controller, Get, UseGuards, Put } from '@nestjs/common';
import { StudyNowService } from './studyNow.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { studyNowDto } from './studyNow.dto';

@Controller('studyNow')
export class StudyNowController {
    constructor(private readonly studyNowService: StudyNowService) { }

    @Get()
    @UseGuards(JwtGuard)
    getFlashCards(@GetUser('id') userId: number) {
        return this.studyNowService.getFlashCards(userId);
    }

    @Put('updateDueDate')
    @UseGuards(JwtGuard)
    updateFlashCards(@GetUser('id') userId: number, @Body() { cardId, performance }: studyNowDto) {
        return this.studyNowService.updateFlashCard(userId, cardId, performance)
    }
}
