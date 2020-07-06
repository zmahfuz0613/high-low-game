const readlineSync = require('readline-sync');

// getInput() is a function that takes a `prompt` as an argument which
// is a question (string) to ask the user.
// the returning value of getInput() is a string of whatever the user has typed as the response

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

// YOUR CODE STARTS HERE!!

// STEP ONE - Building A Deck.
// 1. use a function declaration to create a buildDeck function. [This has already been done for you].
// 2. inside the buildDeck function, create an array called "suits" that lists all four suits from a deck of card as strings [This has already been done for you].
// 3. inside the buildDeck function, create a 2nd array called "ranks" that lists all 13 cards from ace to King as strings. [This has already been done for you].
// 4. inside the buildDeck function, create an empty array called "deck"
// 5. inside the buildDeck function, create a for loop INSIDE of another for loop. The outer loop should loop through the ranks. The inner loop should loop through the suits. Make sure to use different variables for your iterators.
// 6. inside your inner for loop, push your looped iterations of ranks and suits as OBJECTS into the empty deck array. Add a third property to this object with the key "value" and the value equal to the current iterator.
// HINT: The result of step 6 is that each card will be an object inside of the deck array, for example [{suit: "diamonds", rank: "A", value: 0}, {suit: "diamonds", rank: "2", value: 1},...{etc}]. 
//For example, if we wanted to organize the players and teams of the NBA with index numbers, we could write: nba.push({player: players[i], team: teams[n], index: i})
// 7. After your loops, return deck, which should now return an array full of card objects if you were to run buildDeck().

function buildDeck() {	
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const deck = [];
  let currentIterator = 0;
  for (var i = 0; i < ranks.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      deck.push({suit: suits[j], rank: ranks[i], value: currentIterator});
      currentIterator++;
  }
}
return deck;
}
//console.log(buildDeck());

// STEP TWO - Shuffling your deck
// 1. use a function declaration to create a function called shuffle that takes deck as an argument.
// 2. Inside this function create a variable called "shuffledDeck" that takes deck as its value.
// 3. Using "let" declare three new variables: currentIndex, whos value should equal the length of the deck array, and two more: temporaryValue and randomIndex, each of which should currently have no value assigned.
// 4. Create a while loop whos condition is that "currentIndex" does not equal 0, so that we stop looping once we've gone through all 52 cards.
// 5. Inside the while loop, use the javascript Math.methods to generate a random integer between 0 and "currentIndex"
// 6. Inside the while loop, decrement current index by 1.
// 7. Inside the while loop, assign "temporaryValue" with "shuffledDeck" (which is an array) to the [currentIndex].
// 8. Still inside, assign "shuffledDeck[currentIndex]" a value of shuffledDeck to the [randomIndex]
// 9. Still inside, assign "shuffledDeck[randomIndex]" a value of "temporaryValue".
// 10. Review the code from steps 7,8, and 9, and leave a comment explaining what you believe those lines of code are doing as they swap assignments of values between them.
// 11. Finally, close the while loop and return "shuffledDeck". You should now be able to run shuffle(buildDeck()) in node and see your shuffled deck of cards.
function shuffle(deck) {
  const shuffledDeck = deck;
  let currentIndex = deck.length;
  let temporaryValue; 
  let randomIndex;

  while(currentIndex !== 0){
      randomIndex = Math.floor((Math.random() * currentIndex)); //Get a random index
      currentIndex--;
      temporaryValue = shuffledDeck[currentIndex]; //Set temporaryValue with last card of deck without swap previously
      shuffledDeck[currentIndex] = shuffledDeck[randomIndex]; //Set last card with random card
      shuffledDeck[randomIndex] = temporaryValue; //Set random card with last card without swap
  }

  //I always take the last card in the deck without pre-shuffling, 
  //and swap this with a random card between the first card and the last card without pre-shuffling, 
  //the range in each loop decreases until all cards are shuffled.

  return shuffledDeck;  
}
//console.log(shuffle(buildDeck()))

// STEP THREE - Greeting the player 
// 1. Declare a function called greet()
// 2. Inside that function, declare a variable called "name" and use "getInput()" to welcome the user to the game, ask for their name, and assign their answer.
// 3. Console.log name
// 4. return name
// 5. Done.
function greet(){   
  let name = getInput("Welcome to the Card Game, What's your name?");
  console.log(name);
  return name;
}
//console.log(greet());

// STEP FOUR - comparing cards
// 1. declare a function called compare that takes two cards as arguments
// 2. return the value property of the first card minus the value property of the second card.
function compare(card1, card2){    
  return card1.value - card2.value;
}


// STEP FIVE - Respond to User Guess
// 1. declare a function called guess that takes two cards as arguments
// 2. console.log the rank and suit of the current card
// 3. declare a variable called "input" that uses getInput() to ask the user if they think the next card will be higher (h) or lower (l) than their current card and stores the user's response.
// 4. use a conditional statement to see if "input" equals "h" or "l".
// 5. If input equals h, return an expression that checks if the outcome of the compare function (using the same arguments as you used for guess) is a negative number.
// 6. If input equals l, check and see if it's a positive number.
// 7. If input doesn't equal h or l, tell the user that they need to guess either h or l and that they get no points for this round, then return false.

function guess(card1, card2){       
  console.log("Current card -> suit: " + card1.suit +  ", rank: " + card1.rank + ".");
  let input = getInput("Your card is suit: " + card1.suit +  ", rank: " + card1.rank + ". Do you think the next card will be higher (h) or lower (l) than your current card.");
  let result = compare(card1, card2);
  
  if(input === "h"){
      return result < 0;
  }else if(input === "l"){        
      return result > 0;
  }else{
      console.log("You need to guess either h or l. You get no points for this round.");
      return false;
  }
}

// STEP SIX - Let's play!
// 1. declare a function called playGame
// 2. declare a variable called deck (it's okay to reuse -- remember scope!) that takes the result of the shuffle function. Remember that the shuffle function needs to take the results one of our other functions as its argument...
// 3. declare a variable called playerName that takes the result of the greet function as its value.
// 4. using let, declare a score variable that's currently set to the number zero
// 5. use an array method on deck to remove the last object in deck. using let, declare a variable called currentCard and assign it this value.
// 6. create a while loop whos conditions are that score is less than five AND less than the amount of items still in the deck array.
// 7. Inside the while loop, use an array method on deck to remove the last object and assign that value to a variable named nextCard.
// 8. Inside the while loop, create a conditional statement. If the outcome of guess is true, increment the score by 1, congratulate the user, and tell them their score. If it's false, tell them they were wrong and got no points.
// 9. Close the conditional statement and assign nextCard to currentCard. You may have to write this as the type of variable that's always global...
// 10. Close the while loop and use a ternary statement that checks if the length of the deck array has reached zero. 
//If it has not, tell the user that they won. If it has reached zero, tell them that they're out of cards and they lost.
// 11. Write a line of code to execute the playGame function.


function playGame(){
  const deck = shuffle(buildDeck());
  const playerName = greet();
  let score = 0;
  let currentCard = deck.pop();
  while(score < 5 && score < deck.length){
      let nextCard = deck.pop();
      if(guess(currentCard, nextCard)){
          score++;
          ("Congratulations " + playerName + ", you guessed it!  Your score is " + score + ".");
      }else{
          console.log(playerName + " were wrong and you got no points.")
      }
      currentCard = nextCard;
  }
  
  (deck.length === 0) ? console.log("You've run out of cards. You've lost") : console.log("Congratulations "+ playerName + "! You've Won!!");
  
}

playGame();