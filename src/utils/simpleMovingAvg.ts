export const simpleMovingAvg = (arr: number[], num: number): number[] => {
  if (arr.length < num) {
    throw new Error('array lengths is smaller than num');
  }
  const ma: number[] = [];
  const startIndex = num - 1;
  for (let i = startIndex; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < num; j++) {
      sum += arr[i - j];
    }
    ma[i - startIndex] = sum / num;
  }
  return ma; // note => ma.length = arr.length - (num - 1)
};
