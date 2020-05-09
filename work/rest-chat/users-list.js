const users = {};

function checkUIdExit(uId){
    if(users[uId]){
      return true;
    }else{
      return false;
    }
}

function getUsersList(){
    return users;
}

function addUser(username, uuid) {
    if (!username || username.toUpperCase().includes("DOG") || !(/^\S+$/.test(username))) {
      return 406;
    }
    users[uuid] = { username, active: true, uId: uuid };
}

function removeUser(uId) {
    if(users[uId]) {
        users[uId].active = false;
    }
    delete users[uId];
}

module.exports = {
    users,
    addUser,
    removeUser,
    checkUIdExit,
    getUsersList
};