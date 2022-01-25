/**
 * exponentialMovingAvg
 * https://www.investopedia.com/terms/e/ema.asp
 * https://www.metatrader5.com/en/terminal/help/indicators/trend_indicators/ma
 * @param {*} arr
 * @param {*} num
 * @param {*} smoothing
 * @returns
 */
export const exponentialMovingAvg = (
  arr: number[],
  num: number,
  smoothing: number = 2
): number[] => {
  if (arr.length < num) {
    throw new Error('array lengths is smaller than num');
  }

  const ema: number[] = [];

  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += arr[i];
  }
  let firstSimpleAvg = sum / num;

  const multiplier = smoothing / (1 + num);

  ema[0] = arr[num] * multiplier + firstSimpleAvg * (1 - multiplier);

  for (let i = num + 1; i < arr.length; i++) {
    ema[i - num] = arr[i] * multiplier + ema[i - num - 1] * (1 - multiplier);
  }
  return ema; // note => ema.length = arr.length - num
};
