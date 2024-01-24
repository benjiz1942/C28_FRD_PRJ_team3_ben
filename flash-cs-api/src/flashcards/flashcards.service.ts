import { format } from 'date-fns';
import { CreateFlashcard, UpdateFlashcard } from 'src/flashcards/flashcard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FlashcardsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFlashcards(userId: number) {
    return await this.prisma.flashcard.findMany({
      where: { userId: userId },
      include: {
        deckFlashcards: {
          select: {
            deck: {
              select: {
                topic: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }
  async getSpecificCard(userId: number, id: number) {
    // throw new Error('Method not implemented.');
    const numberId = Number(id);
    const specificCardData = await this.prisma.flashcard.findMany({
      where: { userId: userId, id: numberId },
      include: {
        deckFlashcards: {
          select: {
            deck: {
              select: {
                topic: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return specificCardData[0];
  }
  async getPartialFlashcards(userId: number, topics: string[]) {
    const result = await this.prisma.deck.findMany({
      where: {
        userId: userId,
        topic: { in: topics },
      },
      select: {
        topic: true,
        deckFlashcards: { select: { flashcard: true } },
      },
    });

    const transformedData = result.flatMap((topicObj) => {
      const { topic, deckFlashcards } = topicObj;
      return deckFlashcards.map((flashcardObj) => ({
        ...flashcardObj.flashcard,
        topic,
      }));
    });
    return transformedData;
  }

  async postFlashcard(newData: CreateFlashcard, image: string, userId: number) {
    const dueDate = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updateAt = new Date().toISOString();
    const { vocabulary, question, answer, deckId, notes } = newData;
    const numberDeckId = parseInt(deckId);
    const createdRecord = await this.prisma.flashcard.create({
      data: {
        vocabulary: vocabulary,
        question: question,
        answer: answer,
        notes: notes,
        image: image ? image : null,
        userId: userId,
        dueDate: dueDate,
        createdAt: createdAt,
        updatedAt: updateAt,
        interval: 1,
        deckFlashcards: {
          create: { deckId: numberDeckId },
        }, // Assuming 'image' is the field to store the file name
      },
    });

    return createdRecord;
  }

  async updateSpecificCard(
    updateData: UpdateFlashcard,
    image: string,
    userId: number,
    dataId: number,
  ) {
    const dueDate = new Date().toISOString();
    const { vocabulary, question, answer, deckId, notes } = updateData;
    const numberDeckId = parseInt(deckId);
    const numberDataId = Number(dataId);
    const updateRecord = await this.prisma.flashcard.update({
      where: { userId: userId, id: numberDataId },
      data: {
        vocabulary: vocabulary.toString(),
        question: question.toString(),
        answer: answer.toString(),
        notes: notes.toString(),
        image: image,
        deckFlashcards: {
          // Error
          updateMany: {
            where: { flashcardId: numberDataId },
            data: { deckId: numberDeckId },
          },
        }, // Assuming 'image' is the field to store the file name
      },
    });

    return updateRecord;
  }
  async deleteCard(userId: number, dataId: number) {
    const numberDataId = Number(dataId);
    const deleteRecord = await this.prisma.flashcardHistory.deleteMany({
      where: { flashcardId: numberDataId },
    });
    await this.prisma.deckFlashcard.deleteMany({
      where: { flashcardId: numberDataId },
    });
    await this.prisma.flashcard.delete({
      where: { userId: userId, id: numberDataId },
    });
    return deleteRecord;
  }
}
