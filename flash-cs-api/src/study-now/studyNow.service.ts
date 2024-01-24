import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { addDays, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudyNowService {
    constructor(private readonly prisma: PrismaService) { }

    async getFlashCards(userId: number) {
        try {
            const count = await this.prisma.flashcard.count({
                where: {
                    userId: userId,
                    dueDate: { lte: new Date() },
                },
            });

            const randomIndex = Math.floor(Math.random() * count);

            const flashcard = await this.prisma.flashcard.findMany({
                where: {
                    userId: userId,
                    dueDate: { lte: new Date() }
                },
                skip: randomIndex,
                take: 1,
            });
            return flashcard
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }
    }

    async updateFlashCard(userId: number, cardId: number, performance: string) {
        const originalInterval = await this.prisma.flashcard.findFirst({
            where: { id: cardId },
            select: { interval: true }
        })

        let newInterval
        if (performance === 'Good') newInterval = Math.ceil(originalInterval.interval * 2.5)
        else if (performance === 'Hard') newInterval = Math.ceil(originalInterval.interval * 1.2)
        else if (performance === 'Again') newInterval = 1

        let dueDate = startOfDay(new Date())
        if (performance != 'Again') dueDate = addDays(new Date(), newInterval)

        try {
            return await this.prisma.$transaction(async (tx) => {

                await tx.flashcard.update({
                    where: {
                        userId: userId,
                        id: cardId
                    },
                    data: {
                        interval: newInterval,
                        dueDate: dueDate
                    }
                })

                await tx.flashcardHistory.create({
                    data: {
                        flashcardId: cardId,
                        performance: performance
                    }
                })

                return { status: 'successful', message: 'updated' }
            })
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }

    }
}
