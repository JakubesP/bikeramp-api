import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  @Get('weekly')
  getWeeklyStats() {
    throw new NotImplementedException();
  }

  @Get('monthly')
  getMonthlyStats() {
    throw new NotImplementedException();
  }
}
