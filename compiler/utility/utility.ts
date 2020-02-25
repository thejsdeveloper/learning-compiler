export function isDigit(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}
