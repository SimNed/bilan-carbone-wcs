export function getPercentage(value: number, valueComparator: number) {
  const percentage = ((value - valueComparator) / valueComparator) * 100;
  return getNumberFormatedToTwoDecimals(percentage);
}

export function getNumberFormatedToTwoDecimals(number: number) {
  return Math.round(number * 100) / 100;
}
