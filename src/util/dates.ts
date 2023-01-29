// NOTE: now.setUTCHours(0, 0, 0, 0) because only days matters

export const getWeekRange = (now: Date): [Date, Date] => {
  now.setUTCHours(0, 0, 0, 0);
  return [
    new Date(now.setDate(now.getUTCDate() - now.getUTCDay())),
    new Date(now.setDate(now.getUTCDate() - now.getUTCDay() + 6)),
  ];
};

export const getMonthRange = (now: Date): [Date, Date] => {
  now.setUTCHours(0, 0, 0, 0);
  const fd = new Date(now.getUTCFullYear(), now.getUTCMonth(), 2);
  fd.setUTCHours(0, 0, 0, 0);
  const ld = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 1);
  ld.setUTCHours(0, 0, 0, 0);
  return [fd, ld];
};

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

export const getDateAsString = (date: Date) => {
  return `${monthNames[date.getUTCMonth()]}, ${getOrdinalSuffixOf(
    date.getUTCDate(),
  )}`;
};
