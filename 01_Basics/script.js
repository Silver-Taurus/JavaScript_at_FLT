// Basics of JavaScript

/* 
JavaScript is a lightweight, cross-platform, object-oriented computer programming language. JavaScript 
is one of the three core technologies of web development.Now a days, JavaScript can be used in different
places:
    - Client-side: JavaScript was traditionally only used in the browser.
    - Server-side: With the help of node.js, we can use JavaScript on the server as well.

JavaScript is what made modern web development possible:
    - Dynamic effects and interactivity
    - Mordern web applications that we can interact with

Frameworks / libraries like React, Angular and jQuery are 100% based on JavaScript which helps in easy and
fast development of interactive WebApps.

HTML is responsible for the content on the webpage. Then the CSS is responsible for the presentation of those
elements. Whereas, the JavaScript is the real programming language that add dynamics and provides the interactive
effects in the webpage.
*/



/* ---------------------------------------  Variables and Data Types --------------------------------------------------

Primitive JavaScript Data Types
    - Number: Floating point numbers, for decimals and integers
    - String: Sequence of characters, used for text
    - Boolean: Logical data type that can only be `true` or `false`
    - Undefined: Data type of a variable that does not have a value yet
    - Null: Also means `non-existent`

JavaScript has `Dynamic Typing` -> data types are automatically assigned to variables.

A variable name starts with the alphabet, underscore and dollar sign.
*/
var firstName = 'Silver';               // var keyword is used to define the variable container
var lastName = 'Taurus';                // string data-type
var age = 20;                           // number data-type
var fullAge = true;                     // boolean data-type
var job;                                // undefined data-type (since no value is defined yet)
console.log(firstName + ' ' + lastName);      // console.log() is used to print some output in the console of the webpage
console.log(age);
console.log(fullAge);
console.log(job);



/* --------------------------------- Varaible Mutation and Type Coercion ----------------------------------------------
    --> Type coercion is the process of automatically converting the data type.
    --> Variable Mutation is - changing the value of a variable
*/
// ----- Type Coercion -----
console.log(firstName + ' ' + age);     // result of type coercion
var job, isMarried;                     // Mutiple varaible declaration
job = 'teacher';                        // variable assignment (string value)
isMarried = false;                      // variable assignment (boolean value)
// `alert` gives the output but in a pop-up window.
alert(firstName + ' is a ' + age + ' year old ' + job + '. Is he mearried? ' + isMarried);
// `prompt` takes the input from the user in a pop-up window in the webpage.
var input = prompt('What is his last name? ');      
console.log(input);
// ----- Varaible mutation -----
age = 'twenty eight';
job = 'driver';
console.log(age, job);      // Multiple console outputs



/* ---------------------------------- Basic Operators -----------------------------------------------------------------
We can use all types of normal operators:
    - Arithmetic Operators (+, -, /, *, **, %)
    - Relational Operators (<, >, <=, >=, ==, ===, !=, !==)
    - Logical Operators (AND - &&, OR - ||, NOT - !)
    - Assignment (=)
    - Bitwise operators (AND - &, OR - |, XOR - ^)
    - Unary Operators
    - Ternary or Conditional Operator
    - typeof Operator, etc.
*/
var age = 20;
var yearSilver = 2019 - age;
console.log(yearSilver); 
console.log(2019 * 2);
console.log(2019 / 2);
console.log(yearSilver < 2000);
console.log(typeof(yearSilver));
age >= 25 ? console.log('can drink beer!!!') : console.log('can drink juice!!!');
// Operator Precedence is used when there are multiple Operators on the same line. When there are multiple operators of same
// precedence on the same line we need to refer to the Associativity.



// ---------------------------------- if-else statements --------------------------------------------------------------
var fName = 'Silver';
var civilStatus = 'single';
if (civilStatus === 'married') {
    console.log(fName + ' is married!!!');
} else {
    console.log(fName + ' is single!!!');
}

var silverAge = 20;
if (age < 13){
    console.log(fName + ' is a boy.');
} else if (age >= 13 && age < 18) {
    console.log(fName + ' is a teenager.');
} else {
    console.log(fName + ' is an Adult.');
}



// ---------------------------------- Switch Statement ----------------------------------------------------------------
switch(job) {
    case 'tecaher':
    case 'instructor': 
    console.log('teaches kids how to code!!!');
    break;
    
    case 'driver': 
    console.log('drives a taxi!!!');
    break;
    
    case 'designer': 
    console.log('designs beautiful websites!!!');
    break;
    
    default: console.log('does something!!!');
}



// ---------------------------------- Truthy and Falsy Values and Equality operator -----------------------------------
// Truthy and Falsy values are the values that evaluates in the true or false value in a condtional evaulation.
// falsy values: undefined, null, 0, '', NaN
// truthy values: NOT flasy values
var height;
if (height || height === 0) {
    console.log('Variable is defined!!!');
} else {
    console.log('Variable is not defined!!!');
}

// == vs ===
// === is a strict equality checker operator
// == is a equality operator which does type coercion
height = 23;
if (height == '23') {
    console.log('The == operator does type coercion!!!');
}
