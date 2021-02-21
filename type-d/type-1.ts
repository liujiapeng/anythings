// type _reduce_cb_par = string | number;
// type _reduce_cb<T> = (pre: T, cur: T) => T;

// const cb: _reduce_cb<_reduce_cb_par> = (pre, cur) => {
//   if (typeof pre == "number" && typeof cur == "number") return pre + cur;
//   else return "" + pre + cur;
// };
// let sum: _reduce_cb_par = cb(1, 2);
// console.log(sum)