// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};




function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let enteredWord = input.question("Enter a word to score: ");


   let scoringMethod = scorerPrompt();

      console.log(`Score for '${enteredWord}': ${scoringAlgorithms[scoringMethod].scorerFunction(enteredWord)}`);

};

const newPointStructure = transform(oldPointStructure);


let simpleScorer = function(word) {
   return word.length;
};



let vowelBonusScorer = function(word) {
   let wordScore = 0;
   word = word.toUpperCase();

   for (i = 0; i < word.length; i++) {
      if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U' ) {
         wordScore = wordScore + 3;
      } else {
         wordScore++;
      }
   }

   return wordScore;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();

   let score = 0;
 
	for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]]
   }
	
	return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use?
      
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`)
   
   let answer = input.question("Enter 0, 1, or 2: ");

   while (answer > 2 || answer < 0) {
      answer = input.question("Invalid input! Please enter 0, 1, or 2: ");
   }
      
   return answer;
}

function transform(oldPointStructure) {
   
   let resultObject = {};

   for (score in oldPointStructure) {
     
      for (letter in oldPointStructure[score]) {
        
         resultObject[(oldPointStructure[score][letter]).toLowerCase()] = Number(score);
      }
     
   }
   

   return resultObject;
};

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
