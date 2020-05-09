import {
  fetchLogIn,
  fetchLoginStatus,
  fetchLists,
  fetchSendMessage,
  fetchLogout
} from './services';

const appState = {
  pollId: null,
  isLoggedIn: false,
  usersList: {},
  messagesList: [],
  error: '',
};

const users = document.querySelector('.users-list');
const messages = document.querySelector('.messages-list');
const outgoing = document.querySelector('.send-message');
const logout = document.querySelector('.logout');
const sendMessage = document.querySelector('.send-message');
const login = document.querySelector('.login');

function renderLogin( show ) {
  const login = document.querySelector('.login');
  if(show) {
    login.innerHTML = `
      <label>Username: <input/></label>
      <button class="to-login" type="button">Login</button>
    `;
    users.innerHTML = ``;
    messages.innerHTML = ``;
    logout.innerHTML = ``;
    sendMessage.innerHTML = ``;
    poll(false);
  } else {
    login.innerHTML = ``;
  }
}

function renderErrors( text ) {
  document.querySelector('.status').innerHTML = text;
}

function poll(shouldPoll) {
  if( shouldPoll && !appState.pollId ) {
    appState.pollId = setInterval( () => {
      fetchLists()
      .catch( (err) => {
        appState.error = err.code;
        if(err.code != 'network-error'){
          appState.isLoggedIn = false;
        }
        renderPage();
      })
      .then( (usersMessagesList) => {
        appState.error = '';
        appState.usersList = usersMessagesList.usersList;
        appState.messagesList = usersMessagesList.messagesList;
        renderLists(appState.usersList, appState.messagesList);
      });
    }, 5000);
  }
  if( !shouldPoll && appState.pollId ) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

function renderLists( usersList, messagesList ) {
  renderUsersList(usersList);
  renderMessagesList(messagesList);
}

function renderUsersList(usersList){
  users.innerHTML = `<ul class="users">` +
  Object.values(usersList).filter( user => user.active).map( user => `
  <li>
    <div class="user">
      <span class="username">${user.username}</span>
    </div>
  </li>
  `).join('') +
  `</ul>`;
}

function renderMessagesList(messagesList){
  messages.innerHTML = `<ol class="messages">` +
  messagesList.map( message => `
    <li>
      <div class="message">
        <div class="meta-info">
          <div class="sender-info">
            <span class="username">${message.username}</span>
          </div>
          <div class="message-info">
            <span class="time-stamp">${message.timestamp}</span>
          </div>
        </div>
        <p class="message-text">${message.text}</p>
      </div>
    </li>
  `).join('') +
  `</ol>`;
}

function renderMessageInput(){
  outgoing.innerHTML = `
    <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
    <button class="send-button" type="submit">Send</button>`;
}

function renderLogout(){
  logout.innerHTML = ` <button class="logout-button" type="button">Logout</button>`;
}

function renderPage() {
  if(!appState.isLoggedIn)  {
    renderLogin(true);
  } else {
    renderLogin(false);
    renderLists(appState.usersList, appState.messagesList);
    renderMessageInput();
    renderLogout();
  }
  renderErrors(appState.error);
}

login.addEventListener('click', (e) => {
  if(!e.target.classList.contains('to-login')) {
    return;
  }
  const username = login.querySelector('input').value;
  fetchLogIn(username)
  .then( (usersMessagesList) => {
    appState.isLoggedIn = true;
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.error = '';
    poll(true);
    renderPage();
  })
  .catch( (err) => {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  });
});

sendMessage.addEventListener('click', (e) => {
  if(!e.target.classList.contains('send-button')) {
    return;
  }
  const messageText = sendMessage.querySelector('.to-send').value;
  fetchSendMessage(messageText)
  .then( (usersMessagesList) => {
    appState.isLoggedIn = true;
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.error = '';
    renderPage();
  })
  .catch( (err) => {
    appState.error = err.code;
    renderPage();
  });
});

logout.addEventListener('click', (e) => {
  if(!e.target.classList.contains('logout-button')) {
    return;
  }
  fetchLogout()
  .then( () => {
    appState.isLoggedIn = false;
    appState.error = '';
    renderPage();
  })
  .catch( (err) => {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  });
});

fetchLoginStatus()
.then( () => {
  fetchLists()
  .catch( (err) => {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  })
  .then( (usersMessagesList) => {
    appState.error = '';
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.isLoggedIn = true;
    poll(true);
    renderPage();
  });
})
.catch( (err) => {
  if(err.code != 'Initial Login'){
    appState.error = err.code;
  }
  appState.isLoggedIn = false;
  renderPage();
});