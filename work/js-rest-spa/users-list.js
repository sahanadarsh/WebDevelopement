const usersList = {};

const counter = () =>  {
    let count = 2;
    return () => {
      count += 1;
      return count;
    };
};

const nextId = counter();

function checkUserId(uId){
    let found = false;
    for(user in usersList){
        if(usersList[user].uId == uId){
            found = true;
        }
    }
    return found;
}

function addUser(user, userId){
    if (!user.name || user.name.toUpperCase() === "DOG" || !(/^\S+$/.test(user.name))) {
        return 400;
    }
    const nextUserId = nextId();
    user.uId = userId;
    usersList[nextUserId] = user;
}

function deleteUser(uId){
    let userToBeDeleted = 0;
    for(user in usersList){
        if(usersList[user].uId == uId){
            userToBeDeleted = user;
        }
    }
    if (userToBeDeleted != 0) {
        delete usersList[userToBeDeleted];
    }
}

const addfunctions = {
    checkUserId,
    addUser,
    deleteUser,
}

module.exports = addfunctions;