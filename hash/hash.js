/* eslint-disable no-undef */
class HashMap {
  constructor(loadFactor = 0.75) {
    this.buckets = [];
    this.size = 0;
    this.capacity = 16;
    this.loadFactor = loadFactor;
    this.initializeBuckets();
  }

  initializeBuckets() {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = [];
    this.size = 0;
    this.initializeBuckets();
  }

  keys() {
    const allKeys = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        allKeys.push(this.buckets[i][j][0]);
      }
    }
    return allKeys;
  }
  values() {
    const allValues = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.buckets[j].length; j++) {
        allValues.push(this.buckets[i][j][1]);
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        allEntries.push(this.buckets[i][j]);
      }
    }
    return allEntries;
  }

  grow() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = [];
    this.size = 0;
    this.initializeBuckets();

    for (let i = 0; i < oldBuckets.length; i++) {
      for (let j = 0; j < oldBuckets[i].length; j++) {
        this.set(oldBuckets[i][j][0], oldBuckets[i][j][1]);
      }
    }
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set('moon', 'silver')

console.log((test.get("frog")))