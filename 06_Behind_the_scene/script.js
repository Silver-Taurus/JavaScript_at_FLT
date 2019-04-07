// What happens behind the side - Execution of code in JavaScript

/* What happens to our code?
    - JavaScript is always hosted in some environment and that is typically a browser, such as Google
      chrome, Firefox, Safari, etc.

    - When we run the JavaScript code, there's a lot a stuff happening behind the scenes. Where we run
      our code on browser it runs on some kind of JavaScript Engine which executes the code. Inside the  
      Engine, on a larger scale the following takes place:
        - Our code is parsed by a `parser`, i.e., our code is checked line by line whether it is correct
          or not. And if some mistakes are there it stops the execution and give the error back to us.
        - When all the code is successfully parsed, then a data structure named `Abstract Syntax Tree`
          is formed.
        - Then the code is converted into machine code which then direclty runs in the system.
*/



/* Execution Contexts
All JavaScript code needs to run in an environment and these environment are called Execution Contexts.
An `Execution Context` is a container or wrapper which stores variables and in which a piece of our code
is evaluated and executed. 
The default execution context is the `Global Execution Context`. It has the following features:
    - Code that is not inside any function
    - Associated with the global object. In the browser, that's the `window` object.
*/
var lastName = 'Taurus';
console.log(lastName === window.lastName);



/* Execution Stack
The Global Execution Context is for the code that is not inside any function. But for the code which is any
function, each time we call a function it get it's own exexution context. This new Execution Context gets on
the top of the already running execution context hence forming the `Exectuion Stack`. If there is another
function call inside this top execution context it will get inside the execution context of that another
fucntion and that other function's execution context will be at the top of Execution Stack. Then, from the
top of the stack that is the last function called, each function will finish it's execution in the reverse
order as with pop case of a stack, remaining with the starting foremost Global Execution Context, which will
be the last one to be executed before the code finish executing.
*/



/* Execution Context in detail
As we already know, Execution Context is associated with an object called `Execution Context Object`.
This object has 3 properties:
    - Variable Object (VO)
      This contains function argument, inner variable declaration and function declaration.
    - Scope Chain
      This contains current variable objects as well as variable objects of all it's parent.
    - "This" variable
      This contains the reference to the object in which it resides.

When a function is called the new execution stack is put on top of the execution stack. This happens in two
phases:
    - Creation phase
        - Creation of the Varaible Object (VO)
            - The argument object is created, containing all the arguments that were passes into the function.
            - Code is scanned for function declarations: for each function, a property is created in the Varaible
              Object, pointing to the function.
            - Code is scanned for variable declarations: for each variable, a property is created in the Varaible
              Object and set to undefined.
            (The last two points are known as `Hoisting`)
        - Creation of the scope chain
            - Scoping tells, where can we acces a certain variabe.
            - In JavaScript, each new function creates a scope: the space/environment, in which the variables it
              defines are accessible.
            - Lexical Scoping: a function that is lexically within another function gets access to the scope of the
              outer function. 
        - Determine the value of "this" variable
            - Regular function call: the `this` keyword points at the global object (the window object, in the browser).
            - Method call: the `this` variable points to the object that is calling the method.
            (The this keyword is not assigned a value until a function where it is defined is actually called or invoked.)
    - Execution phase
      The code of the function that generated the current execution context is ran line by line.
*/

// Hoisting in practice
// This works only for function declaration method (and not for function expression method).
calcAge(1999);
function calcAge(year) {
    console.log(2019 - year);
}

// Variable Hosting (In this case, the assignment takes place when the statement executes and not at creation phase)
console.log(age);
var age = 20;
console.log(age);

// Scope chaining in practice
// Scope chain works in upward direction.
var a = 'Hello';
first();
function first() {
    var b = 'Hey';
    second();
    function second() {
        var c = 'Hi';
        console.log(a + b + c);
        third();
    }
}
function third(){
    var d = 'Welcome';
    console.log(a + d);
}

// `this` keyword in practice
console.log(this);
function calcAge2(year) {
    console.log(2019 - year);
    console.log(this);               
}
calcAge2(1999);                     // `this` represents the function which is associated with the global execution context and 
                                    // hence with default object (Window).
var john = {
    name: 'John',
    yearOfBirth: 1999,
    calcAge: function(){
        console.log(this);          
        function innerFuncion() {
            console.log(this);      
        }
        innerFuncion();             // `this` represents the function which is by default associates with the default (Window) object.
    }
};
john.calcAge();                     // `this` represents the function which belongs to the Object named john.

// Method Borrowing
var mike = {
    name: 'mike',
    yearOfBirth: 1998,

};
mike.calcAge = john.calcAge;
mike.calcAge()
