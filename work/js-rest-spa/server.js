const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const items = require('./items-list');
const users = require('./users-list');

app.use(express.static('./public'));
app.use(cookieParser());

// function sleep(milliseconds) {
//   let timeStart = new Date().getTime();
//   while (true) {
//       let elapsedTime = new Date().getTime() - timeStart;
//       if (elapsedTime > milliseconds) {
//           break;
//       }
//   }
// }

app.get('/session/', (req, res) => {
  let uId = req.cookies.uid;
  if(uId != null){
    if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'bad-login' });
      return;
    } else {
      res.json({statusCode: 100});
      return;
    }
  }
  res.json({statusCode: 200});
});

app.post('/session/', express.json(), (req, res) => {
  const newUser = req.body;
  const userId = Math.floor(Math.random() * 10000);
  const errorCode = users.addUser(newUser, userId);
  if(errorCode) {
    res.status(400).json({ error: 'bad-login' });
    return;
  }
  res.cookie('uid', userId);
  res.json(null);
});

app.delete('/session/', (req, res) => {
  const uId = req.cookies.uid;
  users.deleteUser(uId);
  res.clearCookie('uid');
  res.json(null);
});

app.get('/items/', (req, res) => {
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  // sleep(1000);
  res.json(items.getItems());
});

app.get('/items/:itemid', (req, res) => {
  const itemId = req.params.itemid;
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  const item = items.getItemById(itemId);
  if(item != null) {
    res.json(item);
  } else {
    res.status(404).json({ error: `Unknown user: ${itemId}`});
  }
});

app.post('/items/', express.json(), (req, res) => {
  const item = req.body;
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  const returnValue = items.addItem(item);
  if(returnValue == 400){
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(returnValue == 409){
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  res.json(returnValue);
});

app.patch('/items/:itemid', express.json(), (req, res) => {
  const item = req.body;
  const itemId = req.params.itemid;
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  const returnValue = items.updateItemById(itemId, item);
  if(returnValue == 400) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(returnValue == 409) {
    res.status(409).json({ error: 'not-found' });
    return;
  }
  res.json(returnValue);
});

app.delete('/items/:itemid', (req, res) => {
  const itemId = req.params.itemid;
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  const errorCode = items.deleteItemById(itemId);
  if(errorCode == 400) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(errorCode == 409) {
    res.status(409).json({ error: 'not-found' });
    return;
  }
  res.json(null);
});

app.listen(3000, () => console.log('running'));