import {
  addPaddingMultiple,
  arrayDiffScalar,
  arrayDivVector,
  arrayDivScalar,
  arraySequentialDiff,
  arraySumScalar,
} from '../utils/arrayUtils';
import { smoothedMovingAvg } from '../utils/smoothedMovingAvg';

/**
 * rsi
 * Relative Strength Index
 * - momentum oscillator which measures the speed and change of price movements
 * - range -> 0 to 100
 * - >70 indicates over bought territory
 * - <30 indicates over sold territory
 *
 * @param closeArr
 * @param num
 * @param movingAvgCalc
 * @param padding
 * @returns
 */
export const rsi = (
  closeArr: number[],
  num: number = 14,
  movingAvgCalc: typeof smoothedMovingAvg = smoothedMovingAvg,
  padding: boolean = true
) => {
  const closeArrDiff = arraySequentialDiff(closeArr);
  const gainArr: number[] = [],
    lossArr: number[] = [];
  for (let i = 0; i < closeArrDiff.length; i++) {
    if (closeArrDiff[i] > 0) {
      gainArr[i] = closeArrDiff[i];
      lossArr[i] = 0;
    } else {
      gainArr[i] = 0;
      lossArr[i] = Math.abs(closeArrDiff[i]);
    }
  }
  const avgGain: number[] = movingAvgCalc(gainArr, num);
  const avgLoss: number[] = movingAvgCalc(lossArr, num);
  const rs: number[] = arrayDivVector(avgGain, avgLoss); // TODO - consider corner case of denominator being 0
  const rsi: number[] = arrayDiffScalar(
    100,
    arrayDivScalar(100, arraySumScalar(1, rs))
  );

  padding && addPaddingMultiple(closeArr.length, rsi);

  return {
    rsi,
  };
};
