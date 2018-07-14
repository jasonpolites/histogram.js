'use strict';

const DynArray = require('./dynarray.js');

class Histogram {

  constructor() {
    this.displayWidthChars = 50;
    this.numBuckets = 10;
    this.resolution = 10;
    this.vals = new DynArray();
    this.ranges = [];
    this.displayVals = [];
    this.compacted = false;
    this.max = 0;
    this.displayVals;
    this.displayRanges;
    this.displayCharsMax = 0;
  }

  addValue(val) {
    this.compacted = false;

    if(val > this.max) {
      this.max = val;
    }

    if(this.vals.length === 0) {
      this.vals.push(1);
    } else {
      let index = Math.round(val / this.resolution);
      let count = this.vals.get(index, 0);
      this.vals.set(index, ++count, 0);
    }
  }

  print() {
    this._compact();
    let str = '', padding;
    for(let i = 0; i < this.displayRanges.length; ++i) {

      let rangeName = `${this.displayRanges[i]}`;
      if(i > 0) {
        str += `\n`;
      }
  
      while(rangeName.length < this.displayCharsMax) {
        rangeName += ' ';
      }

      str += `${rangeName} | `;

      for(let j = 0; j < this.displayVals[i].display; ++j) {
        str += '\u25A0';
      }

      if(this.displayVals[i].display > 0) {
        str += ` (${this.displayVals[i].val})`;
      }
    }

    return str;
  }

  printToConsole() {

    console.log(this.print())

    if(this.displayRanges.length < this.numBuckets && this.resolution > 1) {
      console.log(`\nWARN: Fewer than ${this.numBuckets} buckets shown. Try lowering resolution to ${Math.ceil(this.resolution/10)}\n`)
    }
  }

  setDisplayWidthChars(c) {
    this.displayWidthChars = c;
  }

  setNumBuckets(b) {
    this.numBuckets = b;
  }

  setResolution(r) {
    this.resolution = r;
  }

  _compact() {
    if(this.compacted !== true) {
      this.compacted = true;

      let totalVals = 0;

      if(this.vals.length < this.numBuckets) {

        // Expand
        let currentRange;
        for(let i = 0; i < this.vals.length; ++i) {
          currentRange = (i+1) * this.resolution;
          this.ranges.push(currentRange);

          totalVals += this.vals.get(i, 0);
        }
      } else if(this.vals.length > this.numBuckets) {

        // Contract
        let range = this.max;
        let inc = Math.round( range / this.numBuckets);
        let rangeVal = inc;        

        let compactionRate = this.numBuckets / this.vals.length;

        let newVals = [];
        let compactIndex = 1;
        let compactValue = 0;
        let compactionAccumulator = 0;
        for (let i = 0; i < this.vals.length; ++i) {

          compactionAccumulator += compactionRate;
          compactValue += this.vals.get(i);
          totalVals += this.vals.get(i);

          if(compactionAccumulator >= compactIndex) {

            newVals.push(compactValue);
            compactValue = 0;

            this.ranges.push(rangeVal);
            rangeVal += inc;

            compactIndex++;
          } 
        }

        if(compactValue > 0) {
            newVals.push(compactValue);
            this.ranges.push(rangeVal);
            rangeVal += inc;
          } 

        this.vals.replace(newVals);
      }

      // Prep for display
      this.displayVals = [];

      for (let i = 0; i < this.vals.length; ++i) {
        let val = this.vals.get(i);
        let percent = (val / totalVals);
        let display = Math.ceil(percent *  this.displayWidthChars);
        this.displayVals.push({
          percent, display, val
        });
      }

      this.displayRanges = this.ranges.map((val, index, array) => {
        let str;
        if(index === 0) {
          str = `0 to ${val}`;
        } else {
          str = `${array[index-1]+1} to ${val}`
        }

        if(str.length > this.displayCharsMax) {
          this.displayCharsMax = str.length;
        }

        return str;
      });
    }
  }

  reset() {
    this.vals.reset();
    this.compacted = false;
    this.max = 0;
    this.ranges = [];
    this.displayVals = [];
    this.displayCharsMax = 0;
  }
}

module.exports = Histogram;