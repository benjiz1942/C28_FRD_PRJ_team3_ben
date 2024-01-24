import { Module } from '@nestjs/common';
import { StudyNowService } from './studyNow.service';
import { StudyNowController } from './studyNow.controller';

@Module({
  providers: [StudyNowService],
  controllers: [StudyNowController]
})
export class StudyNowModule { }
