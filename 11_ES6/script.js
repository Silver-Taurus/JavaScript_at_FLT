// ES6

/*-------------------------------- New Features in ES6 --------------------------------------------
    - Variable Declarations with let and const
    - Blocks and IIFEs
    - Strings
    - Arrow Functions
    - Destructing
    - Arrays
    - The Spread Operator
    - Rest and Default Parameters
    - Maps
    - Classes and Subclasses
*/



/* ------------------------------- Variable Declarations ------------------------------------------
In ES5, we declare and define a variables using `var` keyword. We can further down mutate those
variables whenever we want.

However, in ES6 we have two new declaration variables - `let` and `const`. Where let is like the
var, which is used to declare the variables whose value can be changed. While consts is used for
declaring the variable whose value cannot be mutated.

Variables declared with vara in ES5 are function-scoped, but variable declared with let and const
is ES6 are block-scoped.
*/

// ---------- ES5 ----------
var name5 = 'Jane Smith';
console.log(name5);
name5 = 'Jane Miller';
console.log(name5);

// ---------- ES6 ----------
const name6 = 'Silver Taurus';
let age = 19;
console.log(age);   
// name6 = 'Shiba Tatsuya';     -->  will give an Error.
age = 20;
console.log(age);

// ---------- ES5 ----------
function driversLicense5(passedTest) {
    if(passedTest) {
        var firstName = 'John';
        var yearOfBirth  = 19990;
        console.log(firstName + ', born in ' + yearOfBirth + ', is now officially alllowed to drive a car.');
    }
}
driversLicense5(true);

function newDriversLicense5(passedTest) {
    if(passedTest) {
        var firstName = 'John';
        var yearOfBirth  = 19990;
    }
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially alllowed to drive a car.');
}
newDriversLicense5(true);

// ---------- ES6 ----------
function driversLicense6(passedTest) {
    if(passedTest) {
        let firstName = 'John';
        const yearOfBirth  = 19990;
        console.log(firstName + ', born in ' + yearOfBirth + ', is now officially alllowed to drive a car.');
    }
}
driversLicense6(true);

/*  function newDriversLicense6(passedTest) {
        if(passedTest) {
            let firstName = 'John';
            const yearOfBirth  = 19990;
        }
        console.log(firstName + ', born in ' + yearOfBirth + ', is now officially alllowed to drive a car.');
    }
    newDriversLicense6(true);

This will give an error as the console is accessing the firstName and yearOfBirth which is block-scoped and not
the function-scoped like in case of ES5.

Also whenever we declare a constant variable, we must have to provide a value to it.

Also in ES5 we can use a variable before we define it and the output for it will be undefined (Hoisting).
But in ES6 this does not happen and if we try to do so, we will get an Error. This is because of something
called the `temporal-dead zone` (which basically just means, that the variables are actually hoisted but we
still cannot access them before they are declared).
*/

var i = 23;
let j = 23;
for(var i = 0; i < 5; i++){
    console.log(i);
}
console.log(i);
for(let j = 0; j < 5; j++){
    console.log(j);
}
console.log(j);
// This happens because the let variables are blocked scope while hte var variabels are not.