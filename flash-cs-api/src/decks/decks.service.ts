import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DecksService {
  constructor(private readonly prisma: PrismaService) { }

  getAllDecks(userId: number) {
    return this.prisma.deck.findMany({
      where: { userId: userId },
    });
  }

  async createDeck(userId: number, topic: string) {

    const isDeckExist = await this.prisma.deck.findFirst({
      where: {
        userId: userId,
        topic: topic,
      },
      select: { id: true }
    })
    if (isDeckExist) throw new BadRequestException('Deck already exists')


    try {
      if (!isDeckExist) {
        await this.prisma.deck.create({
          data: {
            userId: userId,
            topic: topic,
          }
        });
        return { status: 'successful', message: 'new deck created' }
      }
    } catch (err) {
      throw new BadRequestException('Unknown error occurred')
    }
  }

  async deleteDeck(userId: number, deckId: string) {

    const deckIdNumber = parseInt(deckId)

    try {
      return await this.prisma.$transaction(async (tx) => {

        const flashcardIds = await tx.deckFlashcard.findMany({
          where: { deckId: deckIdNumber },
          select: { flashcardId: true }
        })

        await tx.deckFlashcard.deleteMany({
          where: { deckId: deckIdNumber },
        })

        await tx.flashcard.deleteMany({
          where: { id: { in: flashcardIds.map((card) => card.flashcardId) } }
        });

        await tx.deck.deleteMany({
          where: { id: deckIdNumber },
        })

        return { status: 'successful', message: 'Delete Successful' }
      })
    } catch (err) {
      return new BadRequestException('Unknown error occurred')
    }
  }
}