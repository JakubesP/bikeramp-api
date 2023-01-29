export const getDateString = (now: Date) => {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();

  return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
};
