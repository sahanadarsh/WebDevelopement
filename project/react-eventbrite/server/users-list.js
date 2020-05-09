const { v4: uuidv4 } = require('uuid');
const { getEvent, deleteEvent } = require('./events');

const users = {
  "11": {
      username: "AMITREDDY",
      uid: '11',
      createdEventIds: [1],
      invitedEventIds: [{eventId: 2, responded: ''}],
    },
    "43": {
      username: "BAORAO",
      uid: '43',
      createdEventIds: [2],
      invitedEventIds: [{eventId: 1, responded: ''}],
    },
};

const addUser = ( username) => {
  const id = uuidv4();
  const usersList = Object.values(users);
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      return 401;
    }
  }
  users[id] = {username: username.toUpperCase(),uid: id, createdEventIds: [], invitedEventIds: [] };
  return users[id];
};

const addEventIdToCreatedList = (username, eventId) => {
  const usersList = Object.values(users);
  let userObject = {};
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      userObject = user;
      break;
    }
  }
  userObject.createdEventIds.push(eventId);
};

const addEventIdToInvitedList = (invitees, eventId) => {
  const usersList = Object.values(users);
  let userObject = {};
  for(const invitee of invitees){
    for(user of usersList){
      if(user.username === invitee.toUpperCase()){
        userObject = user;
        break;
      }
    }
    userObject.invitedEventIds.push({eventId: eventId, responded: ''});
  }
};

const deleteFromCreatedList = (eventId, username) => {
  const usersList = Object.values(users);
  let userObject = {};
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      userObject = user;
      break;
    }
  }
  if(userObject){
    for(let index = 0; index < userObject.createdEventIds.length; index++){
      if(userObject.createdEventIds[index] == eventId){
        userObject.createdEventIds.splice(index,1);
        break;
      }
    }
  }
};

const deleteFromInvitedList = (eventId, invitees) => {
  const usersList = Object.values(users);
  let userObject = {};
  for(const inviteeName of invitees){
    for(const user of usersList){
      if(user.username === inviteeName.toUpperCase()){
        userObject = user;
        for(let index = 0; index < userObject.invitedEventIds.length; index++){
          if(userObject.invitedEventIds[index].eventId == eventId){
            userObject.invitedEventIds.splice(index,1);
            break;
          }
        }
        break;
      }
    }
  }
};

const getCreatedEvents = (username) => {
  const listOfUsers = Object.values(users);
  let userObject = {};
  for(const user of listOfUsers){
    if(user.username === username.toUpperCase()){
      userObject = user;
      break;
    }
  }
  const createdEvents = [];
  for(const eventId of userObject.createdEventIds){
    createdEvents.push(getEvent(eventId));
  }
  return createdEvents;
};

const getInvitedEvents = (username) => {
  const usersList = Object.values(users);
  let invitedEventList = []
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      invitedEventList = user.invitedEventIds;
      break;
    }
  }
  const invitedEvents = [];
  for(let i = 0; i < invitedEventList.length; i++){
    invitedEvents.push({event: getEvent(invitedEventList[i].eventId), responded: invitedEventList[i].responded});
  }
  return invitedEvents;
};

const getUsersList = () => {
  return users;
};

const getUser = (username) => {
  const usersList = Object.values(users);
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      return user;
    }
  }
  return 401;
};

const deleteUser = (id) => {
  const user = users[id];
  const createdEventIdList = user.createdEventIds;
  for(const eventId of createdEventIdList){
    deleteEvent(eventId);
  }
  delete users[id];
  return user;
};

const updateResponse = (eventResponse) => {
  const username = eventResponse.username;
  let userObject = {};
  const usersList = Object.values(users);
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      userObject = user;
      break;
    }
  }
  let prevResponse = '';
  for(let i = 0; i < userObject.invitedEventIds.length; i++ ){
    if(userObject.invitedEventIds[i].eventId == eventResponse.eventId) {
      prevResponse = userObject.invitedEventIds[i].responded;
      userObject.invitedEventIds[i].responded = eventResponse.isAttending;
      break;
    }
  }
  return prevResponse;
};

const deleteInvitedEvent = (username, eventId) => {
  let userObject = {};
  const usersList = Object.values(users);
  for(const user of usersList){
    if(user.username === username.toUpperCase()){
      userObject = user;
      break;
    }
  }
  let eventsList = userObject.invitedEventIds;
  for(let index = 0; index < eventsList.length; index++){
    if(eventsList[index].eventId == eventId){
      userObject.invitedEventIds.splice(index,1);
      break;
    }
  }
};

module.exports = {
  users,
  getUser,
  getUsersList,
  addUser,
  deleteUser,
  deleteInvitedEvent,
  getInvitedEvents,
  getCreatedEvents,
  addEventIdToCreatedList,
  addEventIdToInvitedList,
  deleteFromCreatedList,
  deleteFromInvitedList,
  updateResponse,
};