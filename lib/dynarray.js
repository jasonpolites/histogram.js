'use strict';

/**
 * Convenience class for random array (write) access
 */
class DynArray {
  constructor() {
    this.vals = [];
  }

  replace(a) {
    this.vals = a;
  }

  // Sets the given value at the given index
  set(i, val, defaultVal) {
    while(this.vals.length <= i) {
      this.vals.push(defaultVal || 0);
    }
    this.vals[i] = val;
  }

  // INserts the given value at the given index and shifts all other values
  insert(i, val, defaultVal) {
    if(this.vals.length <= i) {
      this.set(i, val, defaultVal);
    } else {
      this.vals.splice(i, 0, val);
    }
  }

  get(i, defaultVal) {
    if(this.vals.length > i) {
      return this.vals[i];
    }
    return defaultVal;
  }

  sort(fn) {
    this.vals.sort(fn);
  }

  push(val) {
    this.vals.push(val);
  }

  array() {
    return this.vals;
  }

  reset() {
    this.vals = [];
  }

  get length() {
    return this.vals.length;
  }
}

module.exports = DynArray;