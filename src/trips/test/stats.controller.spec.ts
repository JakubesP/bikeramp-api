import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from '../controller/stats.controller';
import { StatsService } from '../service/stats.service';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockStatsService = () => ({
  getWeeklyStats: jest.fn(),
  getMonthlyStats: jest.fn(),
});

describe('StatsController', () => {
  let controller: StatsController;
  let statsService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [{ provide: StatsService, useFactory: mockStatsService }],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    statsService = module.get(StatsService);
  });

  describe('getWeeklyStats', () => {
    it('resolves GetWeeklyStatsResponseDto if statsService.getWeeklyStats resolves WeeklyStats', async () => {
      statsService.getWeeklyStats.mockResolvedValue({
        total_distance: 5200,
        total_price: 6000,
      });

      const result = await controller.getWeeklyStats();
      expect(result).toEqual({
        total_distance: '5.2km',
        total_price: '60.00PLN',
      });
    });

    it('throws NOT_FOUND HttpException if statsService.getWeeklyStats resolves null object', async () => {
      statsService.getWeeklyStats.mockResolvedValue(null);

      try {
        await controller.getWeeklyStats();
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('getMonthlyStats', () => {
    it('resolves GetMonthlyStatsResponseItemDto[] if statsService.getMonthlyStats resolves MonthlyStatsItem[]', async () => {
      statsService.getMonthlyStats.mockResolvedValue([
        {
          day: new Date('2023-01-01'),
          total_distance: 5200,
          avg_ride: 510000,
          avg_price: 6000,
        },
      ]);

      const result = await controller.getMonthlyStats();
      expect(result).toEqual([
        {
          day: 'Jan, 1st',
          total_distance: '5.2km',
          avg_ride: '510.0km',
          avg_price: '60.00PLN',
        },
      ]);
    });
  });
});
