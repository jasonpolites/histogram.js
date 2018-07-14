# histogram.js

A simple JS library to generate a histogram string that can be easily printed to `console.log`.  Useful for command line tools which generate lots of values (like load testing tools).

## Basic Usage

```Javascript
'use strict';

const Histogram = require('./lib/histogram.js');

const hist = new Histogram();

// Add some values
hist.addValue(42);
hist.addValue(18);
hist.addValue(80);
hist.addValue(300);
hist.addValue(1);
hist.addValue(35);
hist.addValue(500);
hist.addValue(140);
hist.addValue(8);
hist.addValue(250);

// Render to console
h.printToConsole();
```

Console renders a simple histogram of the data

```
0 to 50    | ■■■■■■■■■■■■■■■■■■■■■■■■■ (5)
51 to 100  | ■■■■■ (1)
101 to 150 | ■■■■■ (1)
151 to 200 |
201 to 250 | ■■■■■ (1)
251 to 300 | ■■■■■ (1)
301 to 350 |
351 to 400 |
401 to 450 |
451 to 500 | ■■■■■ (1)
```

## Customization

Change the width (in characters) of the display

```Javascript
hist.setDisplayWidthChars(100); // Default is 50
```

```
0 to 50    | ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ (5)
51 to 100  | ■■■■■■■■■■ (1)
101 to 150 | ■■■■■■■■■■ (1)
151 to 200 |
201 to 250 | ■■■■■■■■■■ (1)
251 to 300 | ■■■■■■■■■■ (1)
301 to 350 |
351 to 400 |
401 to 450 |
451 to 500 | ■■■■■■■■■■ (1)
```

Change the number of buckets

```Javascript
hist.setNumBuckets(5); // Default is 10
```

```
0 to 100   | ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ (6)
101 to 200 | ■■■■■ (1)
201 to 300 | ■■■■■■■■■■ (2)
301 to 400 |
401 to 500 | ■■■■■ (1)
```


Change the resolution.  Resolution is an approximation of the values you expect to see.  The lower the resolution value, the more raw values will 
be stored in memory, but the more accurate the histogram.  The higher the resolution value, the more performant the histogram will be, but the less 
accurate the data.

If your resolution is too low (i.e. the value is too high), you might see a warning indicating some values are merged which should be separate.

```Javascript
hist.setResolution(100); // Default is 10
```

```
0 to 100   | ■■■■■■■■■■■■■■■■■■■■■■■■■ (5)
101 to 200 | ■■■■■■■■■■ (2)
201 to 300 |
301 to 400 | ■■■■■■■■■■ (2)
401 to 500 |
501 to 600 | ■■■■■ (1)

WARN: Fewer than 10 buckets shown. Try lowering resolution to 10
```

## Repeat Use
You can re-use the same `Histogram` instance over several calls using the `reset()` method

```Javascript
'use strict';

const Histogram = require('./lib/histogram.js');

const hist = new Histogram();

// Add some values
hist.addValue(42);
hist.addValue(18);

// Reset the instance to initial state
hist.reset();

// Previous values are wiped
hist.addValue(80);
hist.addValue(300);
```

## Printing Elsewhere
If you don't want to print to console, you can just extract the string for display elsewhere

```Javascript
let histString = hist.print();
```