import { addPaddingMultiple, arrayDiffVector } from '../utils/arrayUtils';
import { exponentialMovingAvg } from '../utils/exponentialMovingAvg';

/**
 * MACD
 * - many false positives during sideways markets
 * - works well in trending markets
 * - to be used with other technical indicators
 * @param closeArr
 * @param a
 * @param b
 * @param c
 * @param padding
 * @returns
 */

export const macd = (
  closeArr: number[],
  a: number = 12,
  b: number = 26,
  c: number = 9,
  padding: boolean = true
) => {
  const movingAvgFast: number[] = exponentialMovingAvg(closeArr, a);
  const movingAvgSlow: number[] = exponentialMovingAvg(closeArr, b);

  movingAvgFast.splice(0, b - a);

  const macd: number[] = arrayDiffVector(movingAvgFast, movingAvgSlow);
  const signal: number[] = exponentialMovingAvg(macd, c);

  padding &&
    addPaddingMultiple(
      closeArr.length,
      movingAvgFast,
      movingAvgSlow,
      macd,
      signal
    );

  return {
    closeArr,
    movingAvgFast,
    movingAvgSlow,
    macd,
    signal,
  };
};
