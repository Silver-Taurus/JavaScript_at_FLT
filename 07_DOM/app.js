/* GAME RULES
  --> The game has 2 players, playing in rounds.
  --> In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score.
  --> But if the player rolls a 1, all his round score gets lost. After that, it's the next player's turn.
  --> The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score, after that
      it's  the next player's turn.
  --> The first player to reach the 100 points on GLOBAL score wins the game.
*/


// ---------- Initialising the Needed Game Varaibles ----------
var scores, roundScore, activePlayer, gamePlaying;
var diceDOM1 = document.querySelector('#dice-1'), diceDOM2 = document.querySelector('#dice-2');
init();


/* ---------- Selecting a particular part (object) of the code in a way similar to that of CSS ---------- 
`#` is used to select - id's.
`.` is used to select - classes.

`querySelector` selects the first occurence of the query.

We can use the `textContent` property using querySelector which let us access or modify the text value linked with 
the id or element.
    --> document.querySelector('#current-' + activePlayer).textContent = dice;

We can use the `innerHTMl` property using querySelector which let us access or modify the HTML code in a division (div)
whose id is selectd.
    --> document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

We can also select a css property using the querySelector with `(Mathstyle` property and then followed by the css-property.
    --> document.querySelector('.dice').style.display = 'none';
This will hides the dice image, that is present in the center of webpage.
*/


/* ---------- Events ----------
  - `Events` are liek Notifications that are sent to notify the code that something happened on the webapge.
    Examples: clicking a button, resizing a window, scrolling down or pressing a key.
  
  - `Event Listener` is a function that performs an action based on a certain event. It waits for a specific event to happen.

  - An event can only be processed when the Execution Stack is empty, i.e., all the functions have returned and only the Global
    Execution Context is left.

  - Along with the Execution Stack, there are also a `Message Queue` present in the JavaScript Engine. This is where all the
    events that happen in the browser are put and they sit there waiting to be processed (waiting for the execution stack to
    be empty).

  - As soon as the Execution Stack is empty, the Event Listener ,i.e., the function linked with the event in the queue, that is
    ready to be processed, is called, it's Execution Context is put on the top of the stack and becomes the active execution 
    context.

`CallBack function` is a function which calls another function which is given to it as an argument when the conditions are met.
In our case it is the `EvenetListener function`. We can also, directly pass an `Annonymous function` to the Callback function.
(Annonymous function is a function which is not assigned with any function name and thus can be only used once)
*/
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying){
    // 1. Random Number
    var dice1 = Math.ceil(Math.random() * 6), dice2 = Math.ceil(Math.random() * 6);
    
    // 2. Display the result
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score - if the rolled number is not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }  else { nextPlayer(); }
  }
});   // CallBack function (or Higher Order function)

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying){
    // 1. Add Current score to the Global score
    scores[activePlayer] +=  roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Taking the Final Score
    input = Number(document.querySelector('.final-score').value)
    var finalScore = Number.isInteger(input) && input > 0 ? input : 100;

    // 4. Check if the player won the game
    if (scores[activePlayer] >= finalScore) {
      gamePlaying = false; 
      diceDOM1.style.display = 'none';
      diceDOM2.style.display = 'none';
      document.querySelector('.btn-roll').classList.remove('valid');
      document.querySelector('.btn-hold').classList.remove('valid');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0 , 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceDOM1.style.display = 'none';
  diceDOM2.style.display = 'none';
  document.querySelector('.btn-roll').classList.add('valid');
  document.querySelector('.btn-hold').classList.add('valid');
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

};

function nextPlayer() {
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore; 
  
  // classList property provides all the different classes present in the class attribute of the division (div)
  // separated by spaces, out of which we can remove a specific class property using `remove` function. 
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // alternatively --> activePlayer = (activePlayer === 0) ? 1 : 0;

  // we can add a class property using `add` function.
   document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}
