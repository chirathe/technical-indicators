import { arrayAbs, arrayDiffVector, median } from '../utils/arrayUtils';
import { CandleTypes } from './CandleTypes';

/**
 * Doji Candles
 * - single candle stick pattern
 * - open and close are almost same (very thin body)
 * - size of wicks do not matter
 * - represents indecision/uncertainty as part of buyers and sellers
 * - can signal trend reversal or breakout based on the pattern in which it occurs
 *
 * @param openArr
 * @param closeArr
 * @returns
 */
export const doji = (openArr: number[], closeArr: number[]) => {
  const doji: CandleTypes[] = [];
  const candleSize: number[] = arrayAbs(arrayDiffVector(openArr, closeArr));
  const avgCandleSize: number = median(candleSize); // TODO - mean can also be used

  for (let i = 0; i < candleSize.length; i++) {
    doji[i] =
      candleSize[i] <= 0.05 * avgCandleSize
        ? CandleTypes.DOJI
        : CandleTypes.NONE;
  }

  return { doji };
};
