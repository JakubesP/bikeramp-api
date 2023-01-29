import { getDateAsString } from '../../util/dates';
import { MonthlyStatsItem } from '../trips.repository';

export class GetMonthlyStatsResponseItemDto {
  day: string;
  total_distance: string;
  avg_ride: string;
  avg_price: string;

  constructor(stats: MonthlyStatsItem) {
    this.day = getDateAsString(stats.day);
    this.total_distance = `${(stats.total_distance / 1000).toFixed(1)}km`;
    this.avg_ride = `${(stats.avg_ride / 1000).toFixed(1)}km`;
    this.avg_price = `${(stats.avg_price / 100).toFixed(2)}PLN`;
  }
}
