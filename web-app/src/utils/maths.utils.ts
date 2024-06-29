export function getPercentage(value: number, valueComparator: number) {
  const percentage = ((value - valueComparator) / valueComparator) * 100;
  return parseFloat(percentage.toFixed(2));
}
