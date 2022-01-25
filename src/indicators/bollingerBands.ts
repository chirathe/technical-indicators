import {
  addPaddingMultiple,
  arrayDiffVector,
  arrayMulScalar,
  arraySumVector,
} from '../utils/arrayUtils';
import { simpleMovingAvg } from '../utils/simpleMovingAvg';
import { stdDeviation } from '../utils/standardDeviation';

/**
 * bollingerBands
 * - bollinger bands and ATR volatility based indicators
 * - bollinger bands widen when there is more volatility and vice versae
 * - to be used with other technical indicators
 * @param closeArr
 * @param num
 * @param numOfStdDev
 * @param movingAvgCalc
 * @param padding
 * @returns
 */
export const bollingerBands = (
  closeArr: number[],
  num: number = 20,
  numOfStdDev: number = 2,
  movingAvgCalc: typeof simpleMovingAvg = simpleMovingAvg,
  padding: boolean = true
) => {
  const movingAvg: number[] = movingAvgCalc(closeArr, num);
  const stdDevArr: number[] = arrayMulScalar(
    numOfStdDev,
    stdDeviation(closeArr, num)
  );
  const upperBand: number[] = arraySumVector(movingAvg, stdDevArr);
  const lowerBand: number[] = arrayDiffVector(movingAvg, stdDevArr);
  const bandWidth: number[] = arrayDiffVector(upperBand, lowerBand);

  padding &&
    addPaddingMultiple(
      closeArr.length,
      movingAvg,
      upperBand,
      lowerBand,
      bandWidth
    );

  return {
    closeArr,
    movingAvg,
    upperBand,
    lowerBand,
    bandWidth,
  };
};
