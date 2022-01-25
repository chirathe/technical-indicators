import {
  addPaddingMultiple,
  arrayAbs,
  arrayDiffVector,
  arrayMax,
} from '../utils/arrayUtils';
import { exponentialMovingAvg } from '../utils/exponentialMovingAvg';
import { smoothedMovingAvg } from '../utils/smoothedMovingAvg';

/**
 * atr
 * Average True Range
 * - bollinger bands and ATR volatility based indicators
 * - to be used with other technical indicators
 * - ATR gives intuition of the range (high-low) of the stock in given trading period
 * - ATR does not provide an indication of price direction, just volatility
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @param num
 * @param movingAvgCalc
 * @param padding
 * @returns
 */
export const atr = (
  highArr: number[],
  lowArr: number[],
  closeArr: number[],
  num: number = 14,
  movingAvgCalc:
    | typeof smoothedMovingAvg
    | typeof exponentialMovingAvg = smoothedMovingAvg,
  padding: boolean = true
) => {
  const closeAppCpy: number[] = [...closeArr];
  closeAppCpy.pop();

  // shift the highArr and lowArr by 1 element
  const highArrShift: number[] = [...highArr];
  const lowArrShift: number[] = [...lowArr];
  highArrShift.shift();
  lowArrShift.shift();

  // true range
  const tr: number[] = arrayMax(
    arrayDiffVector(highArrShift, lowArrShift),
    arrayAbs(arrayDiffVector(highArrShift, closeAppCpy)),
    arrayAbs(arrayDiffVector(lowArrShift, closeAppCpy))
  );

  // average true range
  const atr: number[] = movingAvgCalc(tr, num);

  padding && addPaddingMultiple(closeArr.length, atr);

  return {
    atr,
  };
};
