export const fetchLogIn = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json();
  });
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  })
};

export const fetchLists = () => {
  return fetch('/lists', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json();
  });
};

export const fetchSendMessage = (messageText) => {
  return fetch('/lists', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ messageText }),
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json();
  });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE'
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
};