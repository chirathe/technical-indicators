import { CandleTypes } from './CandleTypes';

/**
 * Hammer Candles
 * - single candle stick pattern
 * - opposite of shooting star
 * - lower wick is atleast twice the size of the body, upper wick is small or non existent
 * - body can be red or green (green is preferred)
 * - indicates bullish reversal when occurring in durign downtrend
 *
 * @param openArr
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @returns
 */
export const hammer = (
  openArr: number[],
  highArr: number[],
  lowArr: number[],
  closeArr: number[]
) => {
  const hammer: CandleTypes[] = [];

  for (let i = 0; i < openArr.length; i++) {
    hammer[i] =
      highArr[i] - lowArr[i] > 3 * (openArr[i] - closeArr[i]) && // body of the candle is 3 times the total size of the candle
      (closeArr[i] - lowArr[i]) / (0.001 + highArr[i] - lowArr[i]) > 0.6 && // add 0.001 in denominatio to avoid divide by 0 exception
      (openArr[i] - lowArr[i]) / (0.001 + highArr[i] - lowArr[i]) > 0.6 &&
      Math.abs(closeArr[i] - openArr[i]) > 0.1 * (highArr[i] - lowArr[i]) // exclude doji candles
        ? CandleTypes.HAMMER
        : CandleTypes.NONE;
  }

  return { hammer };
};
