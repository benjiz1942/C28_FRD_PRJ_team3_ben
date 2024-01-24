import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFlashcard, UpdateFlashcard } from 'src/flashcards/flashcard.dto';
import { AppService } from './app.service';
import { id } from 'date-fns/locale';

@Controller('flashcards')
export class FlashcardsController {
  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly appService: AppService,
  ) {}

  @Get('specificCard/:itemId')
  @UseGuards(JwtGuard)
  getSpecificFlashcards(
    @GetUser('id') userId: number,
    @Param('itemId') id: number,
  ) {
    return this.flashcardsService.getSpecificCard(userId, id);
  }

  @Get('/')
  @UseGuards(JwtGuard)
  getAllFlashcards(@GetUser('id') userId: number) {
    return this.flashcardsService.getAllFlashcards(userId);
  }

  @Get('filter')
  @UseGuards(JwtGuard)
  getPartialFlashcards(@GetUser('id') userId: number, @Query() query: any) {
    let topics = query.topic;
    if (topics && !Array.isArray(topics)) topics = [topics];
    return this.flashcardsService.getPartialFlashcards(userId, topics);
  }

  @Post('formSubmit')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  async handleFormData(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() data: CreateFlashcard,
    @GetUser('id') userId: number,
  ) {
    let filename: string;
    if (image) {
      const s3Resp = await this.appService.uploadFile(image);
      filename = s3Resp.Key;
    } else {
      filename = null;
    }
    return this.flashcardsService.postFlashcard(data, filename, userId);
  }

  @Put('formSubmit/:dataId')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  async UpdateFormData(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() data: UpdateFlashcard,
    @GetUser('id') userId: number,
    @Param('dataId') dataId: number,
  ) {
    let filename: string;
    if (image) {
      const s3Resp = await this.appService.uploadFile(image);
      filename = s3Resp.Key;
    }
    if (data.isImageDeleted === 'true') filename = null;
    console.log(data.isImageDeleted, filename);
    return this.flashcardsService.updateSpecificCard(
      data,
      filename,
      userId,
      dataId,
    );
  }
  @Delete('/:dataId')
  @UseGuards(JwtGuard)
  async DeleteData(
    @GetUser('id') userId: number,
    @Param('dataId') dataId: number,
  ) {
    return this.flashcardsService.deleteCard(userId, dataId);
  }
}
