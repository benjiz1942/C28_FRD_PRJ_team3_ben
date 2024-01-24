import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('countRevisionWord')
    @UseGuards(JwtGuard)
    countRevisionWord(@GetUser('id') userId: number) {
        return this.dashboardService.countRevisionWord(userId)
    }

    @Get('getDailyTarget')
    @UseGuards(JwtGuard)
    getDailyTarget(@GetUser('id') userId: number) {
        return this.dashboardService.getDailyTarget(userId)
    }

    @Get('countCorrectPercentage')
    @UseGuards(JwtGuard)
    countCorrectPercentage(@GetUser('id') userId: number) {
        return this.dashboardService.countCorrectPercentage(userId)
    }

}
