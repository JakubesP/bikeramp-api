import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { GetWeeklyStatsResponseDto } from '../dto/get-weekly-stats-response.dto';
import { GetMonthlyStatsResponseItemDto } from '../dto/get-monthly-stats-response-item.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  async getWeeklyStats(): Promise<GetWeeklyStatsResponseDto> {
    const stats = await this.statsService.getWeeklyStats();

    if (!stats)
      throw new HttpException(
        'There is no trips to summarize',
        HttpStatus.NOT_FOUND,
      );

    return new GetWeeklyStatsResponseDto(stats);
  }

  @Get('monthly')
  async getMonthlyStats(): Promise<GetMonthlyStatsResponseItemDto[]> {
    const statsItems = await this.statsService.getMonthlyStats();
    return statsItems.map(
      (dayStats) => new GetMonthlyStatsResponseItemDto(dayStats),
    );
  }
}
