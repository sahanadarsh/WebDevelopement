/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chat.js":
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  pollId: null,
  isLoggedIn: false,
  usersList: {},
  messagesList: [],
  error: ''
};
var users = document.querySelector('.users-list');
var messages = document.querySelector('.messages-list');
var outgoing = document.querySelector('.send-message');
var logout = document.querySelector('.logout');
var sendMessage = document.querySelector('.send-message');
var login = document.querySelector('.login');

function renderLogin(show) {
  var login = document.querySelector('.login');

  if (show) {
    login.innerHTML = "\n      <label>Username: <input/></label>\n      <button class=\"to-login\" type=\"button\">Login</button>\n    ";
    users.innerHTML = "";
    messages.innerHTML = "";
    logout.innerHTML = "";
    sendMessage.innerHTML = "";
    poll(false);
  } else {
    login.innerHTML = "";
  }
}

function renderErrors(text) {
  document.querySelector('.status').innerHTML = text;
}

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLists"])()["catch"](function (err) {
        appState.error = err.code;

        if (err.code != 'network-error') {
          appState.isLoggedIn = false;
        }

        renderPage();
      }).then(function (usersMessagesList) {
        appState.error = '';
        appState.usersList = usersMessagesList.usersList;
        appState.messagesList = usersMessagesList.messagesList;
        renderLists(appState.usersList, appState.messagesList);
      });
    }, 5000);
  }

  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

function renderLists(usersList, messagesList) {
  renderUsersList(usersList);
  renderMessagesList(messagesList);
}

function renderUsersList(usersList) {
  users.innerHTML = "<ul class=\"users\">" + Object.values(usersList).filter(function (user) {
    return user.active;
  }).map(function (user) {
    return "\n  <li>\n    <div class=\"user\">\n      <span class=\"username\">".concat(user.username, "</span>\n    </div>\n  </li>\n  ");
  }).join('') + "</ul>";
}

function renderMessagesList(messagesList) {
  messages.innerHTML = "<ol class=\"messages\">" + messagesList.map(function (message) {
    return "\n    <li>\n      <div class=\"message\">\n        <div class=\"meta-info\">\n          <div class=\"sender-info\">\n            <span class=\"username\">".concat(message.username, "</span>\n          </div>\n          <div class=\"message-info\">\n            <span class=\"time-stamp\">").concat(message.timestamp, "</span>\n          </div>\n        </div>\n        <p class=\"message-text\">").concat(message.text, "</p>\n      </div>\n    </li>\n  ");
  }).join('') + "</ol>";
}

function renderMessageInput() {
  outgoing.innerHTML = "\n    <input class=\"to-send\" name=\"text\" value=\"\" placeholder=\"Enter message to send\"/>\n    <button class=\"send-button\" type=\"submit\">Send</button>";
}

function renderLogout() {
  logout.innerHTML = " <button class=\"logout-button\" type=\"button\">Logout</button>";
}

function renderPage() {
  if (!appState.isLoggedIn) {
    renderLogin(true);
  } else {
    renderLogin(false);
    renderLists(appState.usersList, appState.messagesList);
    renderMessageInput();
    renderLogout();
  }

  renderErrors(appState.error);
}

login.addEventListener('click', function (e) {
  if (!e.target.classList.contains('to-login')) {
    return;
  }

  var username = login.querySelector('input').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function (usersMessagesList) {
    appState.isLoggedIn = true;
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.error = '';
    poll(true);
    renderPage();
  })["catch"](function (err) {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  });
});
sendMessage.addEventListener('click', function (e) {
  if (!e.target.classList.contains('send-button')) {
    return;
  }

  var messageText = sendMessage.querySelector('.to-send').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchSendMessage"])(messageText).then(function (usersMessagesList) {
    appState.isLoggedIn = true;
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.error = '';
    renderPage();
  })["catch"](function (err) {
    appState.error = err.code;
    renderPage();
  });
});
logout.addEventListener('click', function (e) {
  if (!e.target.classList.contains('logout-button')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
    appState.isLoggedIn = false;
    appState.error = '';
    renderPage();
  })["catch"](function (err) {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  });
});
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLists"])()["catch"](function (err) {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPage();
  }).then(function (usersMessagesList) {
    appState.error = '';
    appState.usersList = usersMessagesList.usersList;
    appState.messagesList = usersMessagesList.messagesList;
    appState.isLoggedIn = true;
    poll(true);
    renderPage();
  });
})["catch"](function (err) {
  if (err.code != 'Initial Login') {
    appState.error = err.code;
  }

  appState.isLoggedIn = false;
  renderPage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchLists, fetchSendMessage, fetchLogout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLists", function() { return fetchLists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSendMessage", function() { return fetchSendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
var fetchLogIn = function fetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchLists = function fetchLists() {
  return fetch('/lists', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchSendMessage = function fetchSendMessage(messageText) {
  return fetch('/lists', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      messageText: messageText
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};

/***/ })

/******/ });
//# sourceMappingURL=chat.js.map