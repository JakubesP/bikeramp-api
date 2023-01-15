import { WeeklyStats } from '../trips.repository';

export class GetWeeklyStatsResponseDto {
  total_distance: string;
  total_price: string;

  constructor(stats: WeeklyStats) {
    this.total_distance = `${(stats.total_distance / 1000).toFixed(1)}km`;
    this.total_price = `${(stats.total_price / 100).toFixed(2)}PLN`;
  }
}
