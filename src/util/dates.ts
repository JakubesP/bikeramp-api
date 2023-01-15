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
