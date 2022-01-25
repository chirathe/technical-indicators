let x = require('../dist/index');
let y = require('./testData');

/* Moving Averages */
// const arr1 = [1, 6, 2, 7];
// const arr3 = [1, 6, 2, 7, 5, 3, 2];
// const arr4 = [1, 6, 2, 7, 5, 3, 2, 6, 2, 1];
// const arr5 = [1, 6, 2, 7, 5, 3];

// x.addPaddingMultiple(14, arr1, arr3, arr4, arr5);

// console.log('arr1>>', arr1.length, arr1);
// console.log('arr3>>', arr3.length, arr3);
// console.log('arr4>>', arr4.length, arr4);
// console.log('arr5>>', arr5.length, arr5);

// console.log('inp>>>', arr4);
// console.log('simpleMovingAvg>>>', x.simpleMovingAvg(arr4, 4));
// console.log('exponentialMovingAvg>>>', x.exponentialMovingAvg(arr4, 4));
// console.log('smoothedMovingAvg>>>', x.smoothedMovingAvg(arr4, 4));
// console.log('wilderSmoothingAvg>>>', x.wilderSmoothingAvg(arr4, 4));
// console.log('stdDeviation>>>', x.stdDeviation(arr4, 4));

/* ADX */
// const res = x.adx(
//   y.highArr,
//   y.lowArr,
//   y.closeArr,
//   14,
//   x.wilderSmoothingAvg,
//   x.smoothedMovingAvg,
//   false
// );

// console.log(y.highArr.length);
// console.log(res.adx.length);

/* ATR */
// const res = x.atr(
//   y.highArr,
//   y.lowArr,
//   y.closeArr,
//   14,
//   x.smoothedMovingAvg,
//   false
// );

// console.log(y.highArr.length);
// console.log(res.atr.length);

/* MACD */
// const res = x.macd(y.closeArr);
// console.log(res.macd);

/* Bolinger Bands */
// const res = x.bollingerBands(y.closeArr);
// console.log(res.bandWidth);

/* RSI */
// const res = x.rsi(y.closeArr);
// console.log('RSI>>>', res.rsi);

/* Super Trend */
// const res = x.superTrend(y.highArr, y.lowArr, y.closeArr);
// console.log('superTrend>>>', res.superTrend);

/* slope */
const openArr = [35.8, 35.7, 35.6, 35.45, 35.4, 35.4, 35.5];
const closeArr = [35.75, 35.6, 35.45, 35.35, 35.35, 35.4, 35.55];
const res = x.slope(openArr, closeArr, 7);
console.log(res);
