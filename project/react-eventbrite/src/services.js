const convertServiceError = (err) => Promise.reject(err);

export const fetchLoginStatus = (username) => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchRegister = (username) => {
  return fetch('/registration', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( {username} ),
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchLogin = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( {username} ),
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchEvents = (username) => {
  return fetch(`/events/${username}`, {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchEventById = (eventId) => {
  return fetch(`/event/${eventId}`, {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchRegisteredUsers = () => {
  return fetch('/users', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchCreateEvent = (name, organizer, venue, dateTime, details, eventInvitees) => {
  const event = {
    eventName : name,
    eventOrganizer: organizer,
    eventVenue: venue,
    eventDateTime: dateTime,
    eventDetails: details,
    invitees: eventInvitees,
  };
  return fetch('/event', {
  method: 'POST',
  headers: new Headers({
    'content-type': 'application/json',
  }),
    body: JSON.stringify(event),
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
        return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchUpdateEvent = (name, id, organizer, venue, dateTime, details, eventInvitees) => {
  const event = {
    eventName : name,
    eventId : id,
    eventOrganizer: organizer,
    eventVenue: venue,
    eventDateTime: dateTime,
    eventDetails: details,
    invitees: eventInvitees,
  };
  return fetch('/event', {
  method: 'PUT',
  headers: new Headers({
    'content-type': 'application/json',
  }),
    body: JSON.stringify(event),
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
        return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchUpdateResponse = (username, isAttending, eventId) => {
  const eventResponse = {
    username : username,
    isAttending : isAttending,
    eventId : eventId,
  };
  return fetch('/response', {
  method: 'PUT',
  headers: new Headers({
    'content-type': 'application/json',
  }),
    body: JSON.stringify(eventResponse),
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
        return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchDeleteCreatedEvent = (eventId) => {
  return fetch(`/event/${eventId}`, {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.ok;
  });
};

export const fetchDeleteInvitedEvent = (username, eventId) => {
  return fetch(`/${username}/event/${eventId}`, {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.ok;
  });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.ok;
  });
};

export const fetchDelete = () => {
  return fetch('/registration', {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({code: 'NETWORK_ERROR'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.ok;
  });
};