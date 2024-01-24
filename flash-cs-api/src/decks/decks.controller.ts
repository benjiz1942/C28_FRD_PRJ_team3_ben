import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { DecksService } from './decks.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAllDecks(@GetUser('id') userId: number) {
    return this.decksService.getAllDecks(userId);
  }

  @Post('addDeck')
  @UseGuards(JwtGuard)
  createDeck(@GetUser('id') userId: number, @Body() { topic }: { topic: string }) {
    return this.decksService.createDeck(userId, topic);
  }

  @Delete('deleteDeck')
  @UseGuards(JwtGuard)
  deleteDeck(@GetUser('id') userId: number, @Body() { deckId }: { deckId: string }) {
    return this.decksService.deleteDeck(userId, deckId);
  }
}
