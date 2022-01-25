/**
 * smoothedMovingAvg
 * Smoothed Moving Average (SMMA)
 * https://www.metatrader5.com/en/terminal/help/indicators/trend_indicators/ma
 * @param {*} arr
 * @param {*} num
 * @returns
 */
export const smoothedMovingAvg = (arr: number[], num: number): number[] => {
  if (arr.length < num) {
    throw new Error('array lengths is smaller than num');
  }

  const movingAvg: number[] = [];

  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += arr[i];
  }
  let firstSimpleAvg = sum / num;

  movingAvg[0] = (firstSimpleAvg * (num - 1) + arr[num]) / num;

  for (let i = num + 1; i < arr.length; i++) {
    movingAvg[i - num] = (movingAvg[i - num - 1] * (num - 1) + arr[i]) / num;
  }
  return movingAvg; // note => ema.length = arr.length - num
};
