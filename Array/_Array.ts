
class Index extends Array {
  constructor(...args) {
    super(...args);
  }

  /**
   * reduce
   * @param cb
   */
  _reduce(cb: (pre: number, cur: number) => number) {
    let arr = this,
      len = arr.length;
    if (len === 0) return 0;
    if (len === 1) return arr[0];
    let sum: number = arr[0];
    for (let i = 1; i < len; ++i) {
      sum = cb(sum, arr[i]);
    }
    return sum;
  }

  /**
   * map
   * @param cb
   */
  _map<U, T>(cb: (arr: T[], value: T, index: number) => U): U[] {
    let arr = this,
      len = arr.length,
      newArr = [];
    for (let i = 0; i < len; ++i) {
      newArr[i] = cb(arr, arr[i], i);
    }
    return newArr;
  }

  /**
   * foreach
   * @param cb
   */
  _foreach<T>(cb: (arr: T[], value: T, index: number) => void) {
    let arr = this,
      len = arr.length;
    for (let i = 0; i < len; ++i) {
      arr[i] = cb(arr, arr[i], i);
    }
  }
}
export {}
module.exports = Index;
