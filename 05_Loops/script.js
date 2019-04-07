// Loops

// ---------------- For Loops --------------
for(var i = 0; i < 10; i++) {
    console.log(i);
}

var names = ['John', 'Mark', 'Silver'];
var years = new Array(1990, 1998, 1999);

for(var i = 0; i < names.length; i++) {
    console.log(names[i], years[i]);
}

// ---------------- While Loops -------------
var i = 0;
while(i < years.length){
    console.log(names[i], years[i]);
    i++;
}

// continue and break statements
var john = ['John', 'Smith', 1990, 'designer'];
console.log(john);
for (var i = 0; i < john.length; i++){
    if (typeof john[i] !== 'string') continue;
    console.log(john[i]);
}
for (var i = 0; i < john.length; i++){
    if (typeof john[i] !== 'string') break;
    console.log(john[i]);
}
