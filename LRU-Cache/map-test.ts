let map = new Map();
map.set(1, "i am 1");
map.set(2, "i am 2");
map.set(3, "i am 3");

// 每次调用keys()都返回一个新的迭代器，所以每次next()都指向第一个元素
console.log(map.keys().next()); // { value: i am 1, done: false }
console.log(map.keys().next()); // { value: i am 2, done: false }
console.log(map.keys().next()); // { value: i am 3, done: false }

console.log("================================");

let it = map.keys(); // 使用同一个迭代器引用
console.log(it.next()); // { value: i am 1, done: false }
console.log(it.next()); // { value: i am 2, done: false }
console.log(it.next()); // { value: i am 3, done: false }
console.log(it.next()); // { value: undefied, done: false }
