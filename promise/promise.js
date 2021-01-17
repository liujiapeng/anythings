// 先定义三个常量表示状态
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function MyPromise(fn) {
  this.status = PENDING; // 初始状态为pending
  this.value = null; // 初始化value
  this.err = null; // 初始化err

  this.onFulfilledCallbacks = []; // Fulfilled回调数组
  this.onRejectedCallbacks = []; // Rejected回调数组

  // 存一下this,以便resolve和reject里面访问
  var that = this;
  // resolve方法参数是value
  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;

      // 执行从PENDING到Fulfill的方法,如果MyPromise里没有异步任务，同步resolve，这里应该是空的
      that.onFulfilledCallbacks.forEach((cb) => {
        cb(value);
      });
    }
  }

  // reject方法参数是err
  function reject(err) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.err = err;

      // 执行从PENDING到Reject的方法
      that.onRejectedCallbacks.forEach((cb) => {
        cb(err);
      });
    }
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/**
 * @description then调用
 * @param {function} onFulfilled 
 * @param {function} onReject 
 */
MyPromise.prototype.then = function (onFulfilled, onReject) {
  // 如果执行then回调时，状态已经变为fulfilled/reject,则直接执行回调
  if (this.status === FULFILLED) {
    onFulfilled(this.value);
  }
  if (this.status === REJECTED) {
    onReject(this.err);
  }

  // 如果还是PENDING状态，说明Promise构造在异步执行，还没resolve/reject，所以先将回调保存下来
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onReject);
  }
};

/**
 * @description all方法
 * @param {Array} arr 
 */
MyPromise.all = function (arr) {
  let result = [];
  return new MyPromise(function (resolve, reject) {
    let i = 0;
    next();
    function next() {
      arr[i].then((res) => {
        result.push(res);
        i++;
        if (i === arr.length) {
          resolve(result);
        } else {
          next();
        }
      });
    }
  });
};

let p = new MyPromise((resolve, reject) => {
  // resolve('hello')
  // 异步resolve
  setTimeout(() => {
    reject("error");
    // resolve('hello')
  }, 2000);
});

p.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
