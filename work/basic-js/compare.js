"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

let count = 0;
let word1 = word.toUpperCase();
let word2 = guess.toUpperCase();
  for(let i = 0; i < word1.length; i++){
    let word2Index = word2.indexOf(word1[i]);
      if(word2Index >= 0){
        word2 = word2.replace(word2.charAt(word2ndex),"");
        count++;
      }
  }
  return count; 
}



