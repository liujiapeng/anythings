const _call = function (context = window, ...resArgs) {
  context = context instanceof Object ? context : {};

  context.fn = this;

  const result = context.fn(...resArgs); // 这时fn的this就是context了

  delete context.fn;

  return result;
};

Function.prototype._call = _call;

const getInfo = function (sex, school) {
  console.log(this.name);
  console.log(sex);
  console.log(school);
};

const jenson = {
  name: "jenson",
};

getInfo._call(jenson, "male", "SZU");

module.exports._call = _call;
