/**
 * Methods that act of arrays
 */

export const arrayDiffVector = (arr1: number[], arr2: number[]): number[] => {
  if (arr1.length != arr2.length) {
    throw new Error('array lengths do not match');
  }
  const diff: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    diff[i] = arr1[i] - arr2[i];
  }
  return diff;
};

export const arraySumVector = (arr1: number[], arr2: number[]): number[] => {
  if (arr1.length != arr2.length) {
    throw new Error('array lengths do not match');
  }
  const sum: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    sum[i] = arr1[i] + arr2[i];
  }
  return sum;
};

export const arrayDivVector = (arr1: number[], arr2: number[]): number[] => {
  if (arr1.length != arr2.length) {
    throw new Error('array lengths do not match');
  }
  const div: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    div[i] = arr1[i] / arr2[i]; // TODO consider corner case of denominator being 0
  }
  return div;
};

export const arrayMulVector = (arr1: number[], arr2: number[]): number[] => {
  if (arr1.length != arr2.length) {
    throw new Error('array lengths do not match');
  }
  const div: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    div[i] = arr1[i] * arr2[i];
  }
  return div;
};

export const arrayMulScalar = (mulNum: number, arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = mulNum * arr[i];
  }
  return resArr;
};

export const arraySumScalar = (num: number, arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = num + arr[i];
  }
  return resArr;
};

export const arrayDivScalar = (num: number, arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = num / arr[i];
  }
  return resArr;
};

export const arrayDivScalarReverse = (arr: number[], num: number): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = arr[i] / num;
  }
  return resArr;
};

export const arrayDiffScalar = (num: number, arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = num - arr[i];
  }
  return resArr;
};

export const arrayDiffScalarReverse = (
  arr: number[],
  num: number
): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    resArr[i] = arr[i] - num;
  }
  return resArr;
};

export const arrayAbs = (arr: number[]): number[] => {
  return arr.map(n => Math.abs(n));
};

export const arrayMax = (...arrays: Array<number[]>): number[] => {
  const resArr: number[] = [];
  for (let i = 0; i < arrays[0].length; i++) {
    resArr[i] = Math.max(...arrays.map(arr => arr[i]));
  }
  return resArr;
};

export const arraySequentialDiff = (arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 1; i < arr.length; i++) {
    resArr[i - 1] = arr[i] - arr[i - 1]; // current - previous
  }
  return resArr; // note length of result array is one less than length of original array
};

export const arraySequentialDiffReverse = (arr: number[]): number[] => {
  const resArr: number[] = [];
  for (let i = 1; i < arr.length; i++) {
    resArr[i - 1] = arr[i - 1] - arr[i]; // previous - current
  }
  return resArr; // note length of result array is one less than length of original array
};

export const addPadding = (arr: number[], length: number): number[] => {
  let lengthDiff = length - arr.length;
  while (lengthDiff > 0) {
    arr.unshift(NaN);
    lengthDiff--;
  }
  return arr;
};

export const addPaddingMultiple = (
  length: number,
  ...arrays: Array<number[]>
): void => {
  arrays.forEach(arr => addPadding(arr, length));
};

export const median = (arr: number[]): number => {
  arr = [...arr];
  arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);
  if (arr.length % 2) {
    // odd length
    return arr[middleIndex];
  }
  // even length
  return (arr[middleIndex - 1] + arr[middleIndex]) / 2.0;
};

export const range = (num: number): number[] => {
  // TODO handle negatave num -> throw exception
  const resArr: number[] = [];
  while (num - 1 >= 0) {
    resArr.unshift(--num);
  }
  return resArr;
};
