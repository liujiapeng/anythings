# 什么是函数柯里化

> 维基百科上说道：柯里化，英语：Currying，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

<br>

# Begin

一个简单的例子

```javascript
const getSum = (a, b, c) => {
  return a + b + c;
};

const getSumCurry = _.curry(getSum);

getSumCurry(1)(2)(3); // 6
getSumCurry(1, 2)(3); // 6
```

我们可以对参数做任意的组合，只要不超过定义的参数数量

这个实例让 Curring 看起来毫无意义，我们需要一个真正需要柯里化的场景，continue

```javascript
const check = (reg, txt) => {
  return reg.test(txt);
};

check(/\d+/g, "test"); // number exist  => false
check(/[a-z]+/g, "test"); // letter exist => true
```

这是一个简单的正则校验的 function，显而易见，如果我有多个地方需要校验某个规则，我需要在每次调用时都传入校验的正则表达式和校验内容，真麻烦。

为了做到参数复用，用柯里化改造一下：

```javascript
const check = (reg, txt) => {
  return reg.test(txt);
};

// 柯里化
const _curry = (fn) => {
  return function curryFn(...args) {
    // 传入参数少于定义参数
    if (args.length < fn.length) {
      console.log(args.length, fn.length);
      return (...res) => curryFn(...args, ...res);
    }
    // 参数齐全 直接调用
    return fn(...args);
  };
};

const curryCheck = _curry(check);

curryCheck(/\d+/g, "test"); // false

var hasNumber = curryCheck(/\d+/g);
hasNumber("test"); // false
hasNumber("123test"); // false
```

<br>

# More

## 上一道经典面试题

```javascript
// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```

```javascript
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [...args]

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}

add(1)(2)(3).toString() // 6
add(1)(2)(3)(4,5).toString() // 15
```
简而言之，add永远返回一个function, 要得到结果需要自行调用toString