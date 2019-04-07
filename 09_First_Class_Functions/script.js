// First Class Functions

/* Functions are also objects in JavaScript
    - A function is an instance of the Object type.
    - A function behaves like any other Object.
    - We can store functions in a variable.
    - We can pass a function as an argument to another function.
    - We can return a function from a function.
*/



// ------------------------------- Passing Function in a Function -------------------------------------------
var years = [1990, 1965, 1997, 2005, 1999];

// Generic Function (CallBack or Higher-Order function)
function arrayCalc(arr, fn) {
    var resArr = [];
    for(var i = 0; i < arr.length; i++) {
        resArr.push(fn(arr[i]));
    }
    return resArr;
}

function calcAge(ele) {
    return 2019 - ele;
}

function isAdult(ele) {
    return ele >= 18;
}

function maxHeartRate(ele) {
    if (ele >= 18 && ele <= 81) {
        return Math.round(206.9 - (0.67 * ele));
    }
    return -1;
}

var ages = arrayCalc(years, calcAge);
console.log(ages);
console.log(arrayCalc(ages, isAdult));
console.log(arrayCalc(ages, maxHeartRate));



// ------------------------------- Returning Function from a Function ---------------------------------------
function interviewQues(job) {
    switch (job) {
        case 'designer':
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }

        case 'teacher':
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }

        default:
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQues('teacher');
teacherQuestion('John');
var designerQuestion = interviewQues('designer');
designerQuestion('Jane');

// We can directly use the function returned
interviewQues('teacher')('Mark');



// ------------------------------- IIFE (Immediately Invoked Function Expression) ---------------------------
//   - If we want to invoke a function as soon as it is created, what we can do is that, make the function as
//     an annonymous function and then wrap it inside (), so that the javascript will not treat it like a
//     function declaration but as function expression, that is because, in JavaScript what is inside a
//     paranthesis cannot be a statement. And finally we can invoke that wrapped function expression using
//     ().
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(4);



/* ------------------------------- Closures -----------------------------------------------------------------
When we have a function consisting of the inner function, which always has a access to the variables and parameters
of it's outer function, even after the outer function has returned, the inner function along with those variables 
and parameters is called a `Closure`.

How a Closure Works?
    - When we called the retirement function, we ge the retirement execution context along with the retirement
      scope in the scope chain. This retirement functions returns an inner function and then gets removed from the
      execution stack, but the scope does not gets removed from the scope chain, hence continuously providing the
      data to the inner function. Then, the inner function is invoked and it's Exectuion Context is put at the top
      of the stack and its scope is added to the scope chain. This added scope is linked with the already existing
      retirement's scope forming a closure. 
*/
function retirement(retAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        console.log((retAge - age) + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1999);
retirement(65)(1999);

function interviewQuesClosure(job) {
    return function (name) {
        switch (job) {
            case 'designer':
            console.log(name + ', can you please explain what UX design is?');
            break;
            
            case 'teacher':
            console.log('What subject do you teach, ' + name + '?');
            break;

            case 'M-Engineer':
            console.log('Awsome!!!');
            break;

            default:
            console.log('Hello ' + name + ', what do you do?');
        }    
    }
}

interviewQuesClosure('M-Engineer')('Silver');



// ------------------------------- Bind, Call and Apply -----------------------------------------------------
var Silver = {
    name: 'Silver',
    age: 20,
    job: 'M-Engineer',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I am ' + this.name + ' and I am ' + 
            this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I am ' + this.name + ', I am a ' + this.job + ' and I am ' + this.age + 
            ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

Silver.presentation('formal', 'morning');

// Method Borrowing
//  - call method helps other objects (emily) in borrowing the presentation property of Silver object.
//  - apply method also works similar to the call method, but the only difference is that apply is used for
//    an array argument.
Silver.presentation.call(emily, 'formal', 'afternoon');

// Binding a Function (Partial Function)
//  - giving some fixed value for an argument to the original function and making the original function to be
//    used as a new specialised function.
var sivlerFormal = Silver.presentation.bind(Silver, 'formal');
sivlerFormal('morning');

// Another use case for Binding
function isAdultLimit(limit, ele) {
    return ele >= limit;
}
var adultIndia = arrayCalc(ages, isAdultLimit.bind(this, 18));
console.log(adultIndia);
