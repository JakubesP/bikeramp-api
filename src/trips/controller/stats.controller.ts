import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { StatsService } from '../service/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  getWeeklyStats() {
    throw new NotImplementedException();
  }

  @Get('monthly')
  getMonthlyStats() {
    throw new NotImplementedException();
  }
}
