const users = require('./users-list');
const messages = [];

function addMessage( uId, text ) {
  if(!text){
    return 406;
  }
  const timestamp = new Date();
  messages.push({ username: users.users[uId].username, timestamp, text });
}

function getMessagesList(){
  return messages;
}

module.exports = {
  messages,
  addMessage,
  getMessagesList
};