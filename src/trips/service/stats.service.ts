import { Injectable } from '@nestjs/common';
import {
  MonthlyStatsItem,
  TripsRepository,
  WeeklyStats,
} from '../trips.repository';

@Injectable()
export class StatsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  getWeeklyStats(): Promise<WeeklyStats | null> {
    return this.tripsRepository.getWeeklyStats();
  }

  getMonthlyStats(): Promise<MonthlyStatsItem[]> {
    return this.tripsRepository.getMonthlyStats();
  }
}
