const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const messages = require('./messages-list');
const users = require('./users-list');
const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/session', (req, res) => {
  const uId = req.cookies.uid;
  if(!uId) {
    res.status(401).json({ code: 'Initial Login'});
    return;
  }
  if(!users.checkUIdExit(uId)) {
    res.clearCookie('uid');
    res.status(403).json({ code: 'Bad Login: Unknown UID'});
    return;
  }
  res.sendStatus(200);
});

app.post('/session', express.json(), (req, res) => {
  const username = req.body.username;
  const uId = uuidv4();
  if(!uId) {
    res.status(401).json({ code: 'UID missing'});
    return;
  }
  if(users.checkUIdExit(uId)) {
    res.clearCookie('uid');
    res.status(403).json({ code: 'Bad Login: Duplicate UID'});
    return;
  }
  const errorCode = users.addUser(username, uId);
  if(errorCode === 406) {
    res.status(406).json({ code: 'Login Failed : Invalid username'});
    return;
  }
  res.cookie('uid', uId);
  res.json({ usersList : users.getUsersList(),
             messagesList : messages.getMessagesList() });
});

app.get('/lists', (req, res) => {
  const uId = req.cookies.uid;
  if(!uId) {
    res.status(401).json({ code: 'UID missing'});
    return;
  }
  if(!users.checkUIdExit(uId)) {
    res.clearCookie('uid');
    res.status(403).json({ code: 'Bad Login: Unknown UID'});
    return;
  }
  res.json({ usersList : users.getUsersList(),
             messagesList : messages.getMessagesList() });
});

app.post('/lists', express.json(), (req, res) => {
  const uId = req.cookies.uid;
  if(!uId) {
    res.status(401).json({ code: 'UID missing'});
    return;
  }
  if(!users.checkUIdExit(uId)) {
    res.clearCookie('uid');
    res.status(403).json({ code: 'Unknown UID'});
    return;
  }
  const messageText = req.body.messageText;
  const errorCode = messages.addMessage(uId, messageText);
  if(errorCode === 406){
    res.status(406).json({ code: 'Empty message'});
    return;
  }
  res.json({ usersList : users.getUsersList(),
             messagesList : messages.getMessagesList() });
});

app.delete('/session', (req, res) => {
    const uId = req.cookies.uid;
    if(!uId) {
      res.status(401).json({ code: 'UID missing'});
      return;
    }
    if(!users.checkUIdExit(uId)) {
      res.clearCookie('uid');
      res.status(403).json({ code: 'Unknown UID'});
      return;
    }
    users.removeUser(uId);
    res.clearCookie('uid');
    res.sendStatus(200);
  });

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
