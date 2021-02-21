/**
 * Class LRU
 * @param {number} capacity Map的最大容量
 */
class LRUCache {
  cache: Map<number | string, unknown>;
  capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: number) {
    if (this.cache.has(key)) {
      let val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    }

    // 找不到返回-1
    return -1;
  }
  put(key: number | string, val: unknown) {
    // key已经存在
    if (this.cache.has(key)) {
      // 提升 - 先删掉
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 若已经到达最大限制，先淘汰一个最久没有使用的(队头)
      // this.cache.keys()每次会返回一个新的Iterator, next()指向map第一个元素
      this.cache.delete(this.cache.keys().next().value);
    } else {
      // key不存在，cache数量也没有达到上限
      // 啥也不干
    }
    this.cache.set(key, val);
  }
}

let cache = new LRUCache(3);

cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.put(5,5)
cache.put(6,5)

/*
1 : 'i am 1'
2 : 'i am 2'
3 : 'i am 3'
keys().next = 1
keys().next.value = 'i am 1'

get(3)
3 : 'i am 3'
1 : 'i am 1'
2 : 'i am 2'
keys().next = 1
keys().next.value = 'i am 1'

get(1)
1 : 'i am 1'
3 : 'i am 3'
2 : 'i am 2'
keys().next = 2
keys().next.value = 'i am 2'

put(4,'i am 4')
1 : 'i am 1'
3 : 'i am 3'
2 : 'i am 2'
4 : 'i am 4'
keys().next = 4
keys().next.value = 'i am 4'
*/

export {}