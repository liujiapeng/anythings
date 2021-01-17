const _apply = function (context = window, resArgs) {
  context = context instanceof Object ? context : {};

  context.fn = this;

  const result = context.fn(...resArgs); // 这时fn的this就是context了

  delete context.fn;

  return result;
};

Function.prototype._apply = _apply;

const getInfo = function (sex, school) {
  console.log(this.name);
  console.log(sex);
  console.log(school);
};

const jenson = {
  name: "jenson",
};

getInfo._apply(jenson, ["male", "SZU"]);

module.exports._apply = _apply;
