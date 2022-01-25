/**
 * wilderSmoothingAvg
 * The Welles Wilder's Smoothing Average (WWS)
 * Wilder's Smoothing Techniques in https://school.stockcharts.com/doku.php?id=technical_indicators:average_directional_index_adx
 * @param {*} arr
 * @param {*} num
 * @returns
 */
export const wilderSmoothingAvg = (arr: number[], num: number): number[] => {
  if (arr.length < num) {
    throw new Error('array lengths is smaller than num');
  }

  const sumArr: number[] = [];

  let firstSum = 0;
  for (let i = 0; i < num; i++) {
    firstSum += arr[i];
  }

  sumArr[0] = firstSum;

  for (let i = num; i < arr.length; i++) {
    sumArr[i - num + 1] = sumArr[i - num] - sumArr[i - num] / num + arr[i];
  }
  return sumArr; // note => ma.length = arr.length - (num - 1)
};
