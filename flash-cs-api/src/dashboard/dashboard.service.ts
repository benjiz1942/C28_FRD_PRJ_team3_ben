import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }

    async countRevisionWord(userId: number) {
        try {
            const today = new Date();
            today.setHours(today.getHours() + 8);

            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);

            const flashcards = await this.prisma.flashcard.findMany({
                select: {
                    dueDate: true,
                },
                where: {
                    userId: userId,
                    dueDate: {
                        lt: nextWeek,
                    },
                },
                orderBy: {
                    dueDate: 'asc',
                },
            });

            const countsByDate = {};

            const datesWithinWeek = [];
            const currentDate = new Date(today);

            while (currentDate < nextWeek) {
                const dateKey = currentDate.toISOString().split('T')[0];
                datesWithinWeek.push(dateKey);
                countsByDate[dateKey] = 0;
                currentDate.setDate(currentDate.getDate() + 1);
            }

            flashcards.forEach((flashcard) => {
                let dueDate = new Date(flashcard.dueDate);
                dueDate.setHours(dueDate.getHours() + 8);
                if (dueDate < today) dueDate = today

                const dateKey = dueDate.toISOString().split('T')[0];
                if (dateKey in countsByDate) {
                    countsByDate[dateKey]++;
                }
            });

            const result = datesWithinWeek.map((date) => ({ date: date, count: countsByDate[date] }));

            return result;
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }
    }

    async getDailyTarget(userId: number) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);             //Output: eg. 2023-12-26T16:00:00.000Z
            const tomorrow = new Date();
            tomorrow.setHours(24, 0, 0, 0)          //Output: eg. 2023-12-27T16:00:00.000Z


            const vocabAdd = await this.prisma.flashcard.count({
                where: {
                    userId: userId,
                    createdAt: {
                        lt: tomorrow,
                        gt: today
                    },
                },
            });

            const vocabAddTarget = await this.prisma.target.findFirst({
                select: {
                    dailyWord: true
                },
                where: {
                    userId: userId
                }
            })

            const exerciseDone = await this.prisma.userArticle.count({
                where: {
                    userId: userId,
                    isFinished: true,
                    updatedAt: {
                        lt: tomorrow,
                        gt: today
                    },
                },
            });

            const exerciseDoneTarget = await this.prisma.target.findFirst({
                select: {
                    dailyExercise: true
                },
                where: {
                    userId: userId
                }
            })

            const { dailyExercise } = exerciseDoneTarget
            const { dailyWord } = vocabAddTarget
            return { newCard: vocabAdd, newCardTarget: dailyWord, exerciseDone: exerciseDone, exerciseTarget: dailyExercise }
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }
    }

    async countCorrectPercentage(userId: number) {
        try {
            const EndOftoday = new Date();
            EndOftoday.setHours(24, 0, 0, 0);             //Output: eg. 2023-12-26T16:00:00.000Z
            const pastWeek = new Date(EndOftoday);
            pastWeek.setDate(pastWeek.getDate() - 7);

            const userArticleExercise = await this.prisma.userArticleExercise.findMany({
                select: {
                    isCorrect: true,
                    createdAt: true
                },
                where: {
                    userArticle: { userId: userId },
                    createdAt: {
                        gt: pastWeek,
                        lt: EndOftoday
                    },
                },
            });

            return userArticleExercise
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }
    }
}
