const check = (reg: RegExp, txt: string): boolean => {
  return reg.test(txt);
};
// 柯里化
const _curry = <Argus extends any[]>(fn: Function): Function => {
  return function curryFn(...args: Argus | Argus[]) {
    // 传入参数少于定义参数
    if (args.length < fn.length) {
      return (...res: Argus) => curryFn(...args, ...res);
    }
    // 参数齐全 直接调用
    return fn(...args);
  };
};

const curryCheck = _curry(check);

curryCheck(/\d+/g, "test"); // false

var hasNumber = curryCheck(/\d+/g);
hasNumber("test"); // false
hasNumber("123test"); // falsex
