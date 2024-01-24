import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyWordService {
    constructor(private readonly prisma: PrismaService) { }

    async getDailyWord() {
        return this.prisma.searchVocabulary.findFirst({
            where: { isShown: false },
            orderBy: { counter: 'desc' },
            select: { word: true, meaning: true }
        })
    }
}
