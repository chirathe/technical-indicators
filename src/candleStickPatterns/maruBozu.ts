import { arrayAbs, arrayDiffVector, median } from '../utils/arrayUtils';
import { CandleTypes } from './CandleTypes';

/**
 * Maru-Bozu Candles
 * - single candle stick pattern
 * - long and sturdy candle with very small or non existent wicks
 * - body can be red, signifying bears in control
 * - body can be green, signifying bulls in control
 * - can signal breakout or trend reversal depending on where it occurs on the chart
 *
 * @param openArr
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @returns
 */
export const maruBozu = (
  openArr: number[],
  highArr: number[],
  lowArr: number[],
  closeArr: number[]
) => {
  const maruBozu: CandleTypes[] = [];

  const avgCandleSize: number = median(
    arrayAbs(arrayDiffVector(openArr, closeArr))
  ); // TODO - mean can also be used

  // calculate wick sizes
  const highMinusCloseArr = arrayDiffVector(highArr, closeArr);
  const lowMinusOpenArr = arrayDiffVector(lowArr, openArr);
  const highMinusOpenArr = arrayDiffVector(highArr, openArr);
  const lowMinusCloseArr = arrayDiffVector(lowArr, closeArr);

  for (let i = 0; i < openArr.length; i++) {
    if (
      closeArr[i] - openArr[i] > 2 * avgCandleSize && // candle body should be long
      Math.max(highMinusCloseArr[i], lowMinusOpenArr[i]) < 0.005 * avgCandleSize // negligible wick size
    ) {
      maruBozu[i] = CandleTypes.MARU_BOZU_GREEN;
    } else if (
      openArr[i] - closeArr[i] > 2 * avgCandleSize && // candle body should be long
      Math.max(Math.abs(highMinusOpenArr[i]), Math.abs(lowMinusCloseArr[i])) <
        0.005 * avgCandleSize // negligible wick size
    ) {
      maruBozu[i] = CandleTypes.MARU_BOZU_RED;
    } else {
      maruBozu[i] = CandleTypes.NONE;
    }
  }

  return { maruBozu };
};
