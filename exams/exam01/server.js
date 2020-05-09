const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const words = require('./words');
const game = require('./game');
const gameWeb = require('./game-web');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    let uid = req.cookies.uid;
    let id = uid || Math.floor(Math.random() * 10000);
    res.cookie('uid', id);
    game.addPlayer(id);
    let gameInstance = game.getPlayerGameInstance(id);
    res.send(gameWeb.gamePage(gameInstance,words));  
});

app.post('/sendGame', express.urlencoded({ extended: false }), (req, res) => {
    const {text} = req.body;
    let uid = req.cookies.uid;
    let gameInstance = game.getPlayerGameInstance(uid);
    game.addValidGuessedWord(gameInstance,{text});
    game.takeTurn(gameInstance,text);
    res.redirect('/');
});

app.post('/sendNewGame',express.urlencoded({ extended: false }),(req,res)=>{
    let uid = req.cookies.uid;
    let gameInstance = game.getPlayerGameInstance(uid);
    game.startNewGame(gameInstance);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
