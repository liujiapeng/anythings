// call
const _call = require("./call");

/**
 * 使用call/apply 辅助实现
 */
const _bind = function (context, ...resArgs) {
  // 保存this
  let self = this;

  if (typeof self !== "function") {
    throw new TypeError("Error");
  }

  // let context = [].shift._call(args), // 获取第一个参数
  // resArgs = [...args]; // 获取剩余参数

  return function () {
    // ...args - bind时传入的参数
    // ...arguments - 调用函数时传入的参数
    self._call(context, ...resArgs, ...arguments);
  };
};

Function.prototype._bind = _bind;

function getInfo(name, age, sex) {
  console.log(name); // jenson
  console.log(age); // age
  console.log(sex);
  console.log(this.schoolName);
}

const SZU = {
  schoolName: "SZU",
};
const ICU = {
  schoolName: "ICU",
};

// bind其实是绑定参数而不是仅仅绑定this
// 如下bind(null,13)相当于传入了一个参数13, 将作为getInfo的第一个参数age

const getInfoFromSZU = getInfo._bind(SZU, "jenson");
getInfoFromSZU(13, "male");

console.log("===========================================================");

const getInfoFormICU = getInfo._bind(ICU, "jingjing")._bind(null, 15, "female");
getInfoFormICU();

