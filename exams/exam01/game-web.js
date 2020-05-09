const gameWeb = {
  gamePage: function(player,words){
    return `
      <!DOCTYPE html>
      <html>
      <body style="background-color:#FF3300;">
      </body>
        <head>
          <link rel="stylesheet" href="game.css"/>
          <title>Guess word</title>
        </head>
        <h1 class = "heading" > Guess My Word </h1>
        <p class = "word-length-message" > Guess a ${player.secretWord.length} letter Word </p>
        <body>
          <div id="game-app">
            <div class = "display-panel">
              ${gameWeb.getWordComponentGuessedMatchedLists(player,words)}
            </div>
          </div>
        </body>
      </html>
    `;
  },

  getWordComponentGuessedMatchedLists: function(player,words){
    return `
      <div class="wordlist-display-panel">
        ${gameWeb.getWordList(player,words)}
      </div>
      <div class="outgoing">
        ${gameWeb.getComponents(player)}
      </div>
      <div class="guessed-list-display-panel">
        <form action = "/sendGame" method="POST">
          ${gameWeb.userGuessedList(player.guesses)}
        </form>
      </div>
      <div class = "matched-message-display-panel">
        ${gameWeb.getMatchedList(player.matchMessage)}
      </div>
    `;
  },

  getComponents: function(player){
    return `
      <form action = "/sendGame" method="POST">
        <div>
          <input class ="guess-word" type="to-guess" name="text" placeholder="guess word?">
        </div>
        ${gameWeb.createOrDeleteSubmitButton(player)}
        <div class = "turns-number">
          Number of turns : ${player.turns}
        </div>
        <div class = "invalid-warning">
          ${player.inValidWordMessage}
        </div>  
      </form>
      <form action = "/sendNewGame" method="POST">
        ${gameWeb.createOrDeleteNewGameButton(player)}
      </form>
    `; 
  },

  createOrDeleteSubmitButton: function(player){
      if(!player.won){
        return `
          <div>
            <button class="submit-button" name="submit" type = "submit">Submit</button>
          </div>  `
      } else{
          return ``
        }
  },

  createOrDeleteNewGameButton: function(player){ 
    if(player.won){
      return `
        <div>
          ${player.winMessage}
        </div>  
        <div>
          <button class="new-game-button" name="new-game-button" type="submit">New Game</button>
        </div>  `
    } else{
        return `
          <div>
            ${player.winMessage}
          </div>`
      }
  },

  getWordList : function(player,words){
      return `
        <ul class="word-list">` +
          words.map( word => `
            <li>
              <div class="word">
                <span>${word}</span>
              </div>
            </li>
          `).join('') +
        `</ul>
      `;
  },

  userGuessedList: function(guessedWord){
    return `
      <ul class= "guesses" style="list-style-type:none"> ` +
        guessedWord.map(guess => {
          return `
            <li>
              ${guess}
            </li>
          `
        }).join('\n') +
      ` </ul> 
    `;
  },

  getMatchedList: function(matched){
    return ` 
      <ul class= "match-message">`  +
        matched.map(match => {
          return `
            <li>
              ${match}
            </li>
          `
        }).join('\n') +
      ` </ul>
    `;
  },
   
}

module.exports = gameWeb;