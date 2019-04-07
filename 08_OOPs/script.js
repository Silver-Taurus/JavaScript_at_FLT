// Advance JavaScript - OOPs (Object and Inheritance)

/* In JavaScript we have two types of values:
    - Primitives: Numbers, Strings, Booleans, Undefined, Null
    - Objects: Everything else... (Arrays, Functions, Objects, Dates, Wrappers for Numbers, Strings, ...)

That's why in Javascript we say everything is an object, but in real `everything except primitives is an
object` (unlike Python where in real Everything is an Object).
*/



/* ---------------------------- Object-Oriented Programming (ES-5) -------------------------------------------------
    - Objects interacting with one another through methods and properties.
    - Used to store data, structure applications into modules and hence keeping the code clean.

We can create a blueprint on top of which other Objects can be made. In other programming languages we refer it
as class. In JavaScript, it is referred as `Constructor` or `Prototype`. So, the instances of these Constructors
or Prototypes are also an Object.

---------- Inheritance ----------
    - In simple terms, when one object is based on Another object. So, that the one object can get access to the
      properties and methods of another object.
    - This helps in reducing the data redundancy and hence allowing data reusability.

Whenever we made an instance of constructor, we get an object which has a `Prototype` property. The Prototype
property of an object is where we put methods and properties that we want later to be inherited. Generally it
consists of constructor only. But in it we can add other properties also.

Now if we call a method (or access property), JavaScript seacrches for that property in the object's Constructor
blueprint, if it is not found there, then we search in the Prototype property of the object which links to the
inhertied Constructor (or prototype). If we still don't found the property or method there we go on further in the
chain. This is referred as `Prototype Chain`. The final Prototype Property is the null which marks the end of the
chain and returns undefined at last, since nowhere the method or property is found.
*/

// Function Constructor
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calcAge = function() {
        console.log(2019 - this.yearOfBirth);
    };
};

// Instantiation
var john = new Person('John', 1990, 'teacher');
// This works perfectly fine as, when we use `new` operator, first a brand new object is created. After that constructor
// is called. Creating a fucntion causes a new Execution context that also has a `this` variable. In a normal case, this
// refers to the global (window) object, but the new operator here does the work for us and assigns the this to the newly
// created empty object, resulting in the creation of a new Object with the initialised values.

// Method calling
john.calcAge(); 

// Inheritance by defining the prototype property
Person.prototype.category = 'Person';
var jane = new Person('Jane', 1996, 'cop');
console.log(john);
console.log(jane);
console.log(john.category);
console.log(jane.category);

// Note: The JavaScript console in our browser is avery powerful tool to inspect objects and prototype chains.

// Another way of creating an object from a Prototype (Object.create method)
//  - In this case, the object itself works as a Prototype rather than a constructor.
var personProto = {
    calcAge: function() {
        console.log(2019 - this.yearOfBirth);
    }
};

var jonh2 = Object.create(personProto);
jonh2.name = 'John'
jonh2.yearOfBirth = 1990;
jonh2.job = 'teacher';
jonh2.calcAge();

var jane2 = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1996},
    job: {value: 'cop'}
});
jane2.calcAge();



/* Primitives vs Objects
    - Variables containing primitives actually hold the data inside the varaible itself (like in C++). Variable 
      associated with the objects do not actually contain the objects, but instead they contain a reference to
      the place in memory (like in Python).
    - So, in case of assigning a primitive we copy the data in a new variable and for Objects we just share the
      same reference.
    - Same way, when a primitive is passed in a function, a new copy is created while in case of objects we passed
      the reference.
*/
var a = 23;
var b = a;
a = 46;
console.log(a, b);

var obj1 = {
    name: 'Silver',
    age: 19
};
var obj2 = obj1;
obj1.age = 20;
console.log(obj1, obj2);

age = 20;
var obj = {
    name: 'Object',
    city: 'Delhi'
};
function change(a, b) {
    a = 30;
    b.city = 'Itogami';
};
console.log('age = ' + age, 'obj = ', obj);
change(age, obj);
console.log('age = ' + age, 'obj = ', obj);
