import { simpleMovingAvg } from '..';
import {
  addPaddingMultiple,
  arrayDiffVector,
  arrayDivScalarReverse,
  arrayMulScalar,
  arraySumVector,
} from '../utils/arrayUtils';
import { atr as atrFunc } from './atr';

/**
 * superTrend
 * Super Trend
 * - trend folllowing indicator
 * - performs well in trending markets, but gives lot of false signals in sideways market
 * https://medium.com/codex/step-by-step-implementation-of-the-supertrend-indicator-in-python-656aa678c111
 *
 * @param highArr
 * @param lowArr
 * @param closeArr
 * @param period
 * @param multiplier
 * @param padding
 * @returns
 */
export const superTrend = (
  highArr: number[],
  lowArr: number[],
  closeArr: number[],
  period: number = 7, // TODO this can be 10
  multiplier: number = 3,
  padding: boolean = true
) => {
  const { atr } = atrFunc(
    highArr,
    lowArr,
    closeArr,
    period,
    simpleMovingAvg,
    false
  );

  const highLowAvg: number[] = arrayDivScalarReverse(
    arraySumVector(highArr, lowArr),
    2
  );
  const multiplierAtr: number[] = arrayMulScalar(multiplier, atr);

  highLowAvg.splice(0, highLowAvg.length - multiplierAtr.length);
  const basicUpperBand: number[] = arraySumVector(highLowAvg, multiplierAtr);
  const basicLowerBand: number[] = arrayDiffVector(highLowAvg, multiplierAtr);

  const finalUpperBand: number[] = [basicUpperBand[0]]; // TODO check if first element has to be assigned to 0
  const finalLowerBand: number[] = [basicLowerBand[0]]; // TODO check if first element has to be assigned to 0
  const superTrend: number[] = [NaN]; // TODO check if first element has to be assigned to 0

  let firstCrossOver = false;
  for (let i = 1; i < basicUpperBand.length; i++) {
    if (
      basicUpperBand[i] < finalUpperBand[i - 1] ||
      closeArr[i - 1] > finalUpperBand[i - 1]
    ) {
      finalUpperBand[i] = basicUpperBand[i];
    } else {
      finalUpperBand[i] = finalUpperBand[i - 1];
    }
    if (
      basicLowerBand[i] > finalLowerBand[i - 1] ||
      closeArr[i - 1] < finalLowerBand[i - 1]
    ) {
      finalLowerBand[i] = basicLowerBand[i];
    } else {
      finalLowerBand[i] = finalLowerBand[i - 1];
    }

    if (!firstCrossOver) {
      // TODO - check if we need to start from firstCrossOver or from 1 itself
      if (
        closeArr[i - 1] <= finalUpperBand[i - 1] &&
        closeArr[i] > finalUpperBand[i]
      ) {
        superTrend[i] = finalLowerBand[i];
        firstCrossOver = true;
      } else if (
        closeArr[i - 1] >= finalLowerBand[i - 1] &&
        closeArr[i] < finalLowerBand[i]
      ) {
        superTrend[i] = finalUpperBand[i];
        firstCrossOver = true;
      } else {
        superTrend[i] = NaN;
      }
    } else {
      if (
        superTrend[i - 1] === finalUpperBand[i - 1] &&
        closeArr[i] < finalUpperBand[i] // TODO verify if this is <= or <
      ) {
        superTrend[i] = finalUpperBand[i];
      } else if (
        superTrend[i - 1] === finalUpperBand[i - 1] &&
        closeArr[i] > finalUpperBand[i] // TODO verify if this is >= or >
      ) {
        superTrend[i] = finalLowerBand[i];
      } else if (
        superTrend[i - 1] === finalLowerBand[i - 1] &&
        closeArr[i] > finalLowerBand[i] // TODO verify if this is >= or >
      ) {
        superTrend[i] = finalLowerBand[i];
      } else if (
        superTrend[i - 1] === finalLowerBand[i - 1] &&
        closeArr[i] < finalLowerBand[i] // TODO verify if this is <= or <
      ) {
        superTrend[i] = finalUpperBand[i];
      } else {
        superTrend[i] = NaN;
      }
    }
  }

  padding &&
    addPaddingMultiple(
      closeArr.length,
      finalUpperBand,
      finalLowerBand,
      superTrend
    );

  return {
    finalUpperBand,
    finalLowerBand,
    superTrend,
  };
};
