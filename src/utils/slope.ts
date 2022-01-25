// import { arrayDivScalarReverse, arraySumVector, range } from './arrayUtils';

// import regression from 'regression';

// /**
//  * slope
//  *
//  */
// export const slope = (
//   openArr: number[],
//   closeArr: number[],
//   num: number = 7
// ) => {
//   // trim the OHLC data to size
//   openArr = openArr.slice(-1 * num);
//   closeArr = closeArr.slice(-1 * num);

//   // x and y in line equation
//   const y = arrayDivScalarReverse(arraySumVector(openArr, closeArr), 2);
//   const x = range(num);

//   // scale the values to range 0 to 1
//   //   const yMax = Math.max(...y);
//   //   const yMin = Math.min(...y);
//   //   const xMax = x[0];
//   //   const xMin = x[x.length - 1];
//   //   const scaledY = arrayDivScalarReverse(
//   //     arrayDiffScalarReverse(y, yMin),
//   //     yMax - yMin
//   //   );
//   //   const scaledX = arrayDivScalarReverse(
//   //     arrayDiffScalarReverse(x, xMin),
//   //     xMax - xMin
//   //   );

//   //   // adds constant
//   //   const scaledXWithConstant = scaledX.map(x=>([1, x]))

//   const result = regression.linear(
//     x.map((x, index) => [x, y[index]]),
//     {
//       order: 5,
//       precision: 5,
//     }
//   );

//   return {
//     m: result.equation[0],
//     c: result.equation[1],
//   };
// };
