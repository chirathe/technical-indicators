/**
 * Pivot Points
 * - leading indicator
 * - assesses directional movement and potential support and resistance levels
 * - candle <= 15 mins (intraday trading) -> previous day's high, low, close
 * - 15 mins < candle <= 1 hour (hourly) -> previous week's high, low, close
 * - 1 hour < candle <= 1 day (daily) -> previous month's hig, low, close
 * @param closeArr
 * @param highArr
 * @param lowArr
 * @param currentDayStarted
 * @returns
 */

const pivotPoints = (
  closeArr: number[],
  highArr: number[],
  lowArr: number[],
  currentDayStarted: boolean = false
) => {
  let deltaTicks: number = 1;
  currentDayStarted && (deltaTicks = 2);

  const high = highArr[highArr.length - deltaTicks]; // TODO see if rounding of calues is needed
  const low = lowArr[lowArr.length - deltaTicks]; // TODO see if rounding of calues is needed
  const close = closeArr[closeArr.length - deltaTicks]; // TODO see if rounding of calues is needed
  const pivot = (high + low + close) / 3; // TODO see if rounding of calues is needed
  const r1 = 2 * pivot - low; // TODO see if rounding of calues is needed
  const s1 = 2 * pivot - high; // TODO see if rounding of calues is needed

  const r2 = pivot + (high - low); // TODO see if rounding of calues is needed
  const s2 = pivot - (high - low); // TODO see if rounding of calues is needed

  const r3 = high + 2 * (pivot - low); // TODO see if rounding of calues is needed
  const s3 = low - 2 * (high - pivot); // TODO see if rounding of calues is needed

  return { pivot, r1, r2, r3, s1, s2, s3 };
};
