import {
  addPaddingMultiple,
  arrayAbs,
  arrayDiffVector,
  arrayDivVector,
  arrayMax,
  arrayMulScalar,
  arraySequentialDiff,
  arraySequentialDiffReverse,
  arraySumVector,
} from '../utils/arrayUtils';
import { smoothedMovingAvg } from '../utils/smoothedMovingAvg';
import { wilderSmoothingAvg } from '../utils/wilderSmoothingAvg';

/**
 * adx
 * Average Directional Index
 * - measures strength of a trend. it is non directional
 * - range -> 0 to 100
 * - 0-25 -> absent or weak trend
 * - 25-50 -> strong trend
 * - 50-75 -> very strong trend
 * - 75-100 -> extremely strong trend
 *
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @param num
 * @param movingSumCalc
 * @param movingAvgCalc
 * @param padding
 * @returns
 */
export const adx = (
  highArr: number[],
  lowArr: number[],
  closeArr: number[],
  num: number = 14,
  movingSumCalc: typeof wilderSmoothingAvg = wilderSmoothingAvg,
  movingAvgCalc: typeof smoothedMovingAvg = smoothedMovingAvg,
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

  // direction movement calculation
  const highDiff: number[] = arraySequentialDiff(highArr);
  const lowDiffRev: number[] = arraySequentialDiffReverse(lowArr);
  const dmPlus: number[] = [];
  const dmMinus: number[] = [];
  for (let i = 0; i < highDiff.length; i++) {
    if (highDiff[i] > lowDiffRev[i] && highDiff[i] > 0) {
      dmPlus[i] = highDiff[i];
    } else {
      dmPlus[i] = 0;
    }
    if (lowDiffRev[i] > highDiff[i] && lowDiffRev[i] > 0) {
      dmMinus[i] = lowDiffRev[i];
    } else {
      dmMinus[i] = 0;
    }
  }

  const trMovingSum: number[] = movingSumCalc(tr, num);
  const dmPlusMovingSum: number[] = movingSumCalc(dmPlus, num);
  const dmMinusMovingSum: number[] = movingSumCalc(dmMinus, num);

  // directional indicator
  const diPlus: number[] = arrayMulScalar(
    100,
    arrayDivVector(dmPlusMovingSum, trMovingSum)
  );
  const diMinus: number[] = arrayMulScalar(
    100,
    arrayDivVector(dmMinusMovingSum, trMovingSum)
  );

  // directional indicator
  const dx: number[] = arrayMulScalar(
    100,
    arrayDivVector(
      arrayAbs(arrayDiffVector(diPlus, diMinus)),
      arraySumVector(diPlus, diMinus)
    )
  );

  // average directional indicator
  const adx: number[] = movingAvgCalc(dx, num);

  padding && addPaddingMultiple(closeArr.length, diPlus, diMinus, adx);

  return {
    diPlus,
    diMinus,
    adx,
  };
};
