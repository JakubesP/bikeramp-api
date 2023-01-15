import { getMonthRange, getWeekRange } from './dates';

describe('util/dates.ts', () => {
  describe('getWeekRange', () => {
    it('returns first and last day of the current week', () => {
      const [firstDay, lastDay] = getWeekRange(new Date('2023-01-05'));

      expect([
        firstDay.getUTCFullYear(),
        firstDay.getUTCMonth() + 1,
        firstDay.getUTCDate(),
      ]).toEqual([2023, 1, 1]);

      expect([
        lastDay.getUTCFullYear(),
        lastDay.getUTCMonth() + 1,
        lastDay.getUTCDate(),
      ]).toEqual([2023, 1, 7]);
    });
  });

  describe('getMonthRange', () => {
    it('returns first and last day of the current month', () => {
      const [firstDay, lastDay] = getMonthRange(new Date('2023-01-05'));

      expect([
        firstDay.getUTCFullYear(),
        firstDay.getUTCMonth() + 1,
        firstDay.getUTCDate(),
      ]).toEqual([2023, 1, 1]);

      expect([
        lastDay.getUTCFullYear(),
        lastDay.getUTCMonth() + 1,
        lastDay.getUTCDate(),
      ]).toEqual([2023, 1, 31]);
    });
  });
});
