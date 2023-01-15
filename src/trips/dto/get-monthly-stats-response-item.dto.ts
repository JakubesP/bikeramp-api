import { MonthlyStatsItem } from '../trips.repository';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const getOrdinalSuffixOf = (i: number) => {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export class GetMonthlyStatsResponseItemDto {
  day: string;
  total_distance: string;
  avg_ride: string;
  avg_price: string;

  constructor(stats: MonthlyStatsItem) {
    this.day = `${monthNames[stats.day.getUTCMonth()]}, ${getOrdinalSuffixOf(
      stats.day.getUTCDate(),
    )}`;

    this.total_distance = `${(stats.total_distance / 1000).toFixed(1)}km`;
    this.avg_ride = `${(stats.avg_ride / 1000).toFixed(1)}km`;
    this.avg_price = `${(stats.avg_price / 100).toFixed(2)}PLN`;
  }
}
