import { Test, TestingModule } from '@nestjs/testing';
import { TripsRepository } from '../trips.repository';
import { StatsService } from '../service/stats.service';

const exampleWeeklyStats = {
  total_distance: 5200,
  total_price: 6000,
};

const exampleMonthlyStats = [
  {
    day: new Date('2023-01-01'),
    total_distance: 5200,
    avg_ride: 510000,
    avg_price: 6000,
  },
];

const mockTripsRepository = () => ({
  getWeeklyStats: jest.fn(),
  getMonthlyStats: jest.fn(),
});

describe('StatsService', () => {
  let service: StatsService;
  let tripsRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        { provide: TripsRepository, useFactory: mockTripsRepository },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
    tripsRepository = module.get(TripsRepository);
  });

  describe('getWeeklyStats', () => {
    it('resolves WeeklyStats if tripsRepository.getWeeklyStats resolves WeeklyStats', async () => {
      tripsRepository.getWeeklyStats.mockResolvedValue(exampleWeeklyStats);

      const result = await service.getWeeklyStats();
      expect(result).toEqual(exampleWeeklyStats);
    });
  });

  describe('getMonthlyStats', () => {
    it('resolves MonthlyStatsItem[] if tripsRepository.getMonthlyStats resolves MonthlyStatsItem[]', async () => {
      tripsRepository.getMonthlyStats.mockResolvedValue(exampleMonthlyStats);

      const result = await service.getMonthlyStats();
      expect(result).toEqual(exampleMonthlyStats);
    });
  });
});
