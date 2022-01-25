/**
 * stdDeviation
 * Standard Deviation of given population
 * @param arr
 * @param num
 * @returns
 */
export const stdDeviation = (arr: number[], num: number): number[] => {
  const sd: number[] = [];
  const startIndex = num - 1;
  for (let i = startIndex; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < num; j++) {
      sum += arr[i - j];
    }
    let mean = sum / num;

    sum = 0;
    for (let j = 0; j < num; j++) {
      sum += Math.pow(arr[i - j] - mean, 2);
    }

    sd[i - startIndex] = Math.sqrt(sum / num);
  }
  return sd; // note => sd.length = arr.length - (num - 1)
};
