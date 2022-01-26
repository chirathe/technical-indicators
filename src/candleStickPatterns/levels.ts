/**
 * Levels
 * - leading indicator - pivot points
 * - assesses directional movement and potential support and resistance levels
 * - candle <= 15 mins (intraday trading) -> previous day's high, low, close
 * - 15 mins < candle <= 1 hour (hourly) -> previous week's high, low, close
 * - 1 hour < candle <= 1 day (daily) -> previous month's hig, low, close
 * @param high
 * @param low
 * @param close
 * @returns
 */

export const levels = (high: number, low: number, close: number) => {
  const pivot = (high + low + close) / 3; // TODO see if rounding of values is needed
  const r1 = 2 * pivot - low; // TODO see if rounding of values is needed
  const s1 = 2 * pivot - high; // TODO see if rounding of values is needed

  const r2 = pivot + (high - low); // TODO see if rounding of values is needed
  const s2 = pivot - (high - low); // TODO see if rounding of values is needed

  const r3 = high + 2 * (pivot - low); // TODO see if rounding of values is needed
  const s3 = low - 2 * (high - pivot); // TODO see if rounding of values is needed

  return { pivot, r1, r2, r3, s1, s2, s3 };
};
