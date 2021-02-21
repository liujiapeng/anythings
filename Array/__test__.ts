
const _Array = require("./_Array");

// @ts-ignore
console.log(_Array.prototype.__proto__ === Array.prototype); // true

const b = new _Array(1, 2, 3);

console.log(
  b._reduce((pre, cur) => {
    return pre - cur;
  })
);

console.log(
  [1,2,3].reduce((pre, cur) => {
    return pre - cur;
  })
);

// console.log(
//   b._map((arr, value, index) => {
//     return value + "hello";
//   })
// );

// b._foreach((arr, value, index) => {
//   console.log(value, index);
// });
