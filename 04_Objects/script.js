// Objects and Properties
// it consists of key-value pairs (where key is referred as `properties`)
// An Object can hold differet types of data.

// Creating an object
var Silver = {
    firstName: 'Silver',
    lastName: 'Taurus',
    age: 19,
    job: 'M-Engineer',
    isMarried: false
};

console.log(Silver);
console.log(Silver.firstName);
console.log(Silver['job']);

// Object's Proeprty Mutation
Silver.age = 20;
console.log(Silver);

// Alternate way to define an Object
//      var obj = new Object();
//      obj.firstName = obj;
//      obj['age'] = NaN;

// Object Methods
var Silver = {
    firstName: 'Silver',
    lastName: 'Taurus',
    age: 19,
    birthYear: 1999,
    job: 'M-Engineer',
    isMarried: false,
    calcAge: function() {
        this.age = 2019 - this.birthYear;
    }
};
console.log(Silver);
Silver.calcAge();
console.log(Silver);
