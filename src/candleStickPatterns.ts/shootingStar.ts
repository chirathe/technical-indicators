import { CandleTypes } from './CandleTypes';

/**
 * Shooting Star Candles
 * - single candle stick pattern
 * - opposite of hammer
 * - upper wick is atleast twice the size of the body, lower wick is small or non existent
 * - body can be red or green (red is preferred)
 * - indicates bearish reversal when occurring in durign uptrend
 *
 * @param openArr
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @returns
 */
export const shootingStar = (
  openArr: number[],
  highArr: number[],
  lowArr: number[],
  closeArr: number[]
) => {
  const shootingStar: CandleTypes[] = [];

  for (let i = 0; i < openArr.length; i++) {
    shootingStar[i] =
      highArr[i] - lowArr[i] > 3 * (openArr[i] - closeArr[i]) && // body of the candle is 3 times the total size of the candle
      (highArr[i] - closeArr[i]) / (0.001 + highArr[i] - lowArr[i]) > 0.6 && // add 0.001 in denominatio to avoid divide by 0 exception
      (highArr[i] - openArr[i]) / (0.001 + highArr[i] - lowArr[i]) > 0.6 &&
      Math.abs(closeArr[i] - openArr[i]) > 0.1 * (highArr[i] - lowArr[i]) // exclude doji candles
        ? CandleTypes.SHOOTING_STAR
        : CandleTypes.NONE;
  }

  return { shootingStar };
};
