// Functions
// Helps in appying the `DRY` principle ,i.e., Don't Repeat Yourself.

// Function declaration
function calculateAge(birthYear) {
    return 2019 - birthYear;
}
var ageSilver = calculateAge(1999);
console.log(ageSilver);

function yearsUntilRetirement(birthYear, firstName) {
    var age = calculateAge(birthYear);
    var retirement = (firstName === 'Silver' || firstName == 'silver') ? NaN : 65 - age;

    if (retirement > 0) {
        console.log(firstName + ' retires in ' + retirement + ' years.');
    } else if (retirement || retirement === 0) {
        console.log(firstName + ' is already retired.');
    } else {
        console.log(firstName + ' never retires.');
    }
}
yearsUntilRetirement(1999, 'Silver');
yearsUntilRetirement(1998, 'Rohan');
yearsUntilRetirement(1953, 'Rahul');
yearsUntilRetirement(1954, 'Manish');



// ---------------------------------- Function Statements and Expressions ---------------------------------------------
// ----- Function declaration (statement) method -----
//      function whatDoYouDo(job, firstName) { ... }
// ----- Function Expression method -----
var whatDoYouDo = function(job, firstName) {
    switch(job) {
        case 'teacher':
        case 'instructor':
        return firstName + ' teaches kids how to code.';

        case 'driver':
        return firstName + 'drives the taxi.';

        case 'designer':
        return firstName + 'designs the interactive webpages.';

        default:
        return firstName + ' do something else';
    }
}
console.log(whatDoYouDo('designer', 'Silver'));
console.log(whatDoYouDo('teacher', 'Shiba'));
console.log(whatDoYouDo('cop', 'Celin'));

// There are two main fundamental concepts in JavaScript:
//      - Expressions
//      - Statements
// Expressions in JavaScript are pieces of code that always produce a value and it doesn't matter how long they are as
// long as they gives a single value. So, in JavaScript whenever we require a value we need to write an expression.
// Wheter statements are those piece of codes which do not give an immidiate result like - if/else, loops, function
// declaration, etc.
