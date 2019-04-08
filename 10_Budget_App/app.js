// Making a Budget-Info Mantaining App (ES-5)

/* ------------------------------- Architecture ---------------------------------------------------
    1. Add Event handler
    2. Get Input Values
    3. Add new item to our data structure
    4. Add new item to the UI
    5. Calculate the budget
    6. Update the UI
*/


/* ------------------------------- Structuring Code with Modules ----------------------------------
    - Modules are important aspect of any robust application's architecture.
    - Keep the units of code for a project both cleanly separated and organized.
    - Encapsulates some data into privacy and expose other data publicly.

So, the modules we need for our architecture are:
    - one handling the `UI` (UIController)
        - Get Input values
        - Add the new item to the UI 
        - Update the UI
    - other handling the `Data` (budgetController)
        - Add the new item to our data structure
        - Calculate budget
    - and the `Controller` module (controller)
        - Add event handler
        (controls the app and provide a link between the other two modules)
*/


/* ------------------------------- Module Pattern - Using IIFE and Closures -----------------------
We can implement a module pattern by using an `IIFE` which will return an object having some of the
public properties which we can have acces to. This object may contain a `closure` function which has
access to the private properties (to which we don't have a direct access) but can be used using the
public closure function.

var Test = (function() {
    // Private Memebers
    var x = 23;
    var add = function (a) {
        return x + a;
    }

    // Object with the Public Memebers
    return {
        publicTest: function (b) {
            console.log(add(b))
        }
    }

})();
Test.publicTest(7);

---------- Separation of Concerns ----------
Sepration of concerns mean that each part of the application should only be interested in doing one
thing independently. In our case, UIController which deals with the UI and the budgetConroller which
deals with data manipulation are not linked or dependent on each other and are two different and
independent task units, containing their own bunch of methods. What integrate them will be the
budgetController module. So, whenever we want to change the working of our code, we only need to
look for the budgetController module pattern and not for the other two modules.
*/

/* ------------------------------- Event Delegation -----------------------------------------------
    - Event Bubbling and target element
      This means that when an event is fired or triggered on some DOM element, for ex: when clicking
      a button, then it will also fire on all the parent elements. So, we say that event bubbles up.
      Now, the elements on which the event was actually first fired, is called the `target` element.

The important part is that, this target element is stored in the event property as a part of it. So,
this means, all the parent elements on which the event will be fire will know about the target element.
This brings us to event delegation, because if the event bubbles up in the DOM tree, and if we know
where the event was fired then we can simple attach an event handler to a parent element and wait for
the event to bubble and can do whatever we want to do with target element. This technique is called
`Event Delegation`.

Two use cases for event delegation:
    - When we have an element with lots of child elements that we are interested in.
    - When we want an event handler attached to an element that is not yet in DOM when our page
      is loaded.
*/

// Budget Controller
var budgetController = (function() {

    // Function Constructor for the Expense List
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // Adding the calculateExpPercentage method for each of the object such that the object can inherit
    // it but we can not directly use them using the function constructor.
    // (adding in the Prototype property)
    Expense.prototype.calculatePercentage = function(totalIncome) {
        if(totalIncome > 0){
            this.percentage = Math.round(this.value / totalIncome * 100);
        }
    };

    // Adding the getExpPercentage to get the expense percentage for an object
    // (hence adding it to the prototype and not to the constructor)
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    // Fucntion Constructor for the Income List
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Function to calculate the total values of both Income and Expenses
    var calcTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    // Data Structure to store the data regarding expenses and income
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        expPercentage: -1
    };

    // Returning the object that will be used for Data Manipulation
    return {
        // Method to add item in the Data Structure
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new ID
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;
            
            // create new item based on 'inc' or 'exp' type
            if(type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            }

            // Push it into out data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        // Method to delete the target data from the data structure
        deleteItem: function(type, id) {
            // Taking the array list we want to delete element from
            var ids = data.allItems[type].map(function(cur) {
                return cur.id;
            });

            // Getting the index of the id we want to delete
            var index = ids.indexOf(id);

            // If the id is found, then we will use splice function to delete the id element
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        // Method to Calculate the budget
        calculateBudget: function() {
            // calculate total expenses and income
            calcTotal('exp');
            calcTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            data.expPercentage = data.totals.inc > 0 ? Math.round(data.totals.exp / data.totals.inc * 100) : -1;
        },

        // Method for calculating the each expense percentage
        calculateExpPercentages: function() {
                data.allItems.exp.forEach(function(cur) {
                    cur.calculatePercentage(data.totals.inc);
                });
        },

        // Method for getting all the Percentage of Expenses as an array
        getExpPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPercentages;
        },

        // Method to return budget details to the Controller
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                expPercentage: data.expPercentage
            }
        },

        showData: function() {
            console.log(data);
        }
    };

})();


// UI Controller
var UIController = (function() {
    
    // Structure to store all the DOM strings at one place
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        expPercLabel: '.budget__expenses--percentage',
        container: '.container',
        itemExpPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    // Making a forEach loop Function for node values
    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // Function for formatting the UI
    var formatNumber = function(num, type) {
        // Overriding the number with it's absolute value
        num = Math.abs(num);

        // num is primitive data type, but after adding the method with it, the JS will automatically
        // convert it into an object and then we can use their methods.
        // Fixing the number to the 2 decimal places and returns a string.
        num = num.toFixed(2);   

        // Splitting the number into two parts: Integer part and the Decimal part
        var numSplit = num.split('.');
        var int = numSplit[0];
        var dec = numSplit[1];

        // Adding the commas after every 3 digits in the integer part
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        // Getting the sign for the number on the basis of type
        // Returning the formatterd Number
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    // Returning the object that will be used for UI Manipulation
    return {
        // Method to get input from the HTML webpage
        getinput: function() {
            // Returning the input object to the controller
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            };
        },

        // Method to add new item on the Webpage
        addListItem: function(obj, type) {
            var html, newHtml;

            // Create HTML string with placeholder text
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' + 
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' + 
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            } else if(type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' + 
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div>' + 
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' + 
                '</div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Method for removing an entry from the UI
        deleteListItem: function(selectorID) {
            // Get the element by ID
            var element = document.getElementById(selectorID);

            // Remove the element by first traversing to the Parent Node and then removing the Child Node
            element.parentNode.removeChild(element);
        },

        // Method for clearing the fields after one input has been entered
        clearFields: function() {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        // Method to Dislpay the Budget in the UI
        displayBudget: function(obj) {
            // Displaying the content on the UI
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc' : 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            // Handling the negative percentage case
            if (obj.expPercentage > 0) {
                document.querySelector(DOMstrings.expPercLabel).textContent = obj.expPercentage + '%';
            } else {
                document.querySelector(DOMstrings.expPercLabel).textContent = '---';
            }
        },

        // Method to Display the Percentages on the UI
        displayPercentages: function(percentages) {
            // Getting all the percentage fields that are to be updated (or displayed)
            var fields = document.querySelectorAll(DOMstrings.itemExpPercLabel);

            // Executing the nodeListForEach loop and then display the percentage value on the UI
            nodeListForEach(fields, function(cur, index) {
                if(percentages[index] > 0) {
                    cur.textContent = percentages[index] + '%'
                } else {
                    cur.textContent = '---';
                }
            });
        },

        // Method to display the Month and Year on the UI
        displayDay: function() {
            // Getting the today's date
            var now = new Date();

            // Extracting the month number from the now object and then it's value from
            // the month array
            month = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var m = now.getMonth();

            // Extracting the full year info
            var year = now.getFullYear();

            // Displaying the year details on the UI
            document.querySelector(DOMstrings.dateLabel).textContent = month[m] + ', ' + year;
        },

        // Method for changing the focus color from blue to red when the type changes from income to expense
        changeType: function() {
            // Toggle the red-focus class on the required fields
           document.querySelector(DOMstrings.inputType).classList.toggle('red-focus');
           document.querySelector(DOMstrings.inputDescription).classList.toggle('red-focus');
           document.querySelector(DOMstrings.inputValue).classList.toggle('red-focus');
           document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        // Method to return the DOMstrings to the controller
        getDOmstrings: function() {
            return DOMstrings;
        }
    };

})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
    
    // Function to set the EventListeners
    var setEventListeners = function() {
        // Getting the DOMstrings from the UIController
        var DOM = UICtrl.getDOmstrings();

        // Adding the EventListener with the click submit (tick) button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Adding the EventListener with the `return` keypress
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // Adding the EventListener with the click delete button
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        // Adding the EventListener with the change type button
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

    // Function to Add a new item by taking input from the UI and giving it to Data Structure
    var ctrlAddItem = function() {
        // Get the input from the webpage
        var input =  UICtrl.getinput();

        // Ensure that the fields are not empty
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // Getting the new item which is added in the data structure
            var newItem = budgetController.addItem(input.type, input.description, input.value);

            // Uploading the new item added to the UI list
            UICtrl.addListItem(newItem, input.type);

            // Clearing the fields for the new entry
            UICtrl.clearFields();

            // Updating the budget
            updateBudget();    

            // Updating the percentages
            updateExpPercentages();
        }
    };

    // Function to Delete an item from the Income and Expenses List in the Data Structure and the UI
    var ctrlDeleteItem = function(event) {
        // Getting the parent itemID
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        var splitID, type, ID;

        if(itemID) {
            // Splitting the itemID to get the type and ID
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // Delete the item from the UI
            UICtrl.deleteListItem(itemID);  

            // Update and show the new budget
            updateBudget();

            // Update the percentages
            updateExpPercentages();
        }
    };

    // Function to Update the Budget
    var updateBudget = function() {
        // Calculate the budget
        budgetCtrl.calculateBudget();

        // Return the budget
        var budget = budgetCtrl.getBudget();

        // Display the Budget on the UI
        UICtrl.displayBudget(budget);
    };

    // Function to Update the each Expenses Percentages
    var updateExpPercentages = function() {
        // Calculate percentages
        budgetCtrl.calculateExpPercentages();

        // Read percentages from the budget controller
        var percentages = budgetCtrl.getExpPercentages();

        // Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayDay();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                expPercentage: -1
            });
            setEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();