export function getPercentage(value: number, comparatedValue: number) {
  const percentage = ((comparatedValue - value) / value) * 100;
  return getNumberFormatedToTwoDecimals(percentage);
}

export function getNumberFormatedToTwoDecimals(number: number) {
  return Math.round(number * 100) / 100;
}
