// Arrays
// collection of data

// Initialiaze new array
var names = ['John', 'Mark', 'Silver'];
var years = new Array(1990, 1998, 1999);

// Accessing the array data using subscript operator []
console.log(names[2], names, names.length);
console.log(years[2], years, years.length);

// Mutating the array data using the subscript operator []
names[1] = 'Ben';
console.log(names)

// Array can ahve different data types
var dataSilver = ['Taurus', 20]
console.log(dataSilver);

// Array methods
dataSilver.push('black')
console.log(dataSilver);
dataSilver.unshift('Silver');
dataSilver.push(NaN);
dataSilver.unshift(NaN);
console.log(dataSilver);
dataSilver.pop();
console.log(dataSilver);
dataSilver.shift();
console.log(dataSilver);
dataSilver.push('Programmer');
console.log(dataSilver)
var isDesigner = dataSilver.indexOf('designer') === -1 ? 'Silver is not a designer' : 'Silver is a designer';
console.log(isDesigner);