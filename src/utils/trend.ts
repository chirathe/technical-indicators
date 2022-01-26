export enum Trend {
  NONE = 'NONE',
  UP = 'UP',
  DOWN = 'DOWN',
}

/**
 * Trend
 * Considers last num values to decide whether the current trend is up trend or down tren
 * @param openArr
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @param num
 */
export const trend = (
  openArr: number[],
  highArr: number[],
  lowArr: number[],
  closeArr: number[],
  num: number = 7
): Trend => {
  let lastIndex = closeArr.length - 1,
    upCount = 0,
    downCount = 0;
  for (let i = 0; i < num; i++) {
    if (lowArr[lastIndex - i] >= lowArr[lastIndex - i - 1]) {
      upCount++;
    } else if (highArr[lastIndex - i] <= highArr[lastIndex - i - 1]) {
      downCount++;
    }
  }
  if (closeArr[lastIndex] > openArr[lastIndex] && upCount >= 0.7 * num) {
    // last candle is green and 70% of last few candles were moving up
    return Trend.UP;
  } else if (
    openArr[lastIndex] > closeArr[lastIndex] &&
    downCount >= 0.7 * num
  ) {
    // last candle is red and 70% of last few candles were moving down
    return Trend.DOWN;
  }
  return Trend.NONE;
};
