const wordList = require('./words');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const players = [];

function GameInstance(uid) {
    this.secretWord = pickWord(wordList);
    this.turns = 0;
    this.validWord = false;
    this.numberOfMatchingLetters = 0;
    this.inValidWordMessage = '';
    this.winMessage = '';
    this.uid = uid;
    this.guesses = [];
    this.matchMessage = [];
    this.won = false;
    console.log('Secret word is ' + this.secretWord);
}

function addPlayer(uid){
    let found = false;
    for(let playerIndex = 0; playerIndex < players.length; playerIndex++){
        let player = players[playerIndex];
        if(player.uid == uid){
            found = true;
            break;
        }
    }
    if(found == false){
        players.push(new GameInstance(uid));
    }
}

function getPlayerGameInstance(uid){
    for(let playerIndex = 0;playerIndex < players.length; playerIndex++){
        let player = players[playerIndex];
        if(player.uid == uid){
            return player;
        }
    }
}

addValidGuessedWord = function(player, {text}){
    if(!text || text.length != player.secretWord.length || !wordList.includes(text.toUpperCase()) || text.toUpperCase() === player.secretWord.toUpperCase()){
        text = '';
    }
    player.guesses.push(text.toUpperCase());
};

startNewGame = function(player){
    player.secretWord = pickWord(wordList);
    player.turns = 0;
    player.validWord = false;
    player.numberOfMatchingLetters = 0;
    player.inValidWordMessage = '';
    player.winMessage = '';
    player.won = false;
    while(player.guesses.length != 0){
        player.guesses.pop();
        player.matchMessage.pop();
    }
    console.log('Secret word is ' + player.secretWord);
};

function compare(word, guess) {
    let matches = 0;
    const letterCount = {};
    for (let letter of word.toLowerCase()) {
        letterCount[letter] = letterCount + 1 || 1;
    }
    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}

function takeTurn(player, guess) {
    if(!guess || guess.length!=player.secretWord.length || !wordList.includes(guess.toUpperCase())) {
        player.validWord = false;
        player.inValidWordMessage = 'Invalid Word, Guess another word';
    }else{
        player.validWord = true;
        player.inValidWordMessage = '';
        player.turns++;
        if (exactMatch(player.secretWord, guess)) {
            readline.close;
            player.won = true;
            if(player.turns == 1){
                player.winMessage = 'CORRECT!  You won in ' + player.turns + ' turn!, Start a New Game';
            }else{
                player.winMessage = 'CORRECT!  You won in ' + player.turns + ' turns!, Start a New Game';
            }
       }else{
           player.numberOfMatchingLetters = compare(player.secretWord, guess);
           player.matchMessage.push('You matched ' + player.numberOfMatchingLetters + ' letters out of ' + player.secretWord.length);
       }
    }
}

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase();
}

function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

const addfunctions = {
    GameInstance,
    compare,
    exactMatch,
    pickWord,
    takeTurn,
    addValidGuessedWord,
    startNewGame,
    addPlayer,
    getPlayerGameInstance
}

module.exports = addfunctions;