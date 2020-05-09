
const events = {
  "1": {
        eventId : 1,
        eventName: "Birthday",
        eventOrganizer: "AMITREDDY",
        eventVenue: 'Bothell',
        eventDateTime: 'April 30th 3 to 5pm PST',
        eventDetails: 'lets have fun',
        invitees: ['BAORAO'],
        attending : 0,
        notAttending: 0,
    },
  "2": {
        eventId : 2,
        eventName: "Marraige",
        eventOrganizer: "BAORAO",
        eventVenue: 'Bothell',
        eventDateTime: 'April 20th 10 to 5pm PST',
        eventDetails: 'lets have fun',
        invitees: ['AMITREDDY'],
        attending : 0,
        notAttending: 0,
    },
};

const counter = () =>  {
  let count = 5;
  return () => {
    count += 1;
    return count;
  };
};

const nextId = counter();

const addEvent = ( event ) => {
  const nextEventId = nextId();
  let errorMessage = '';
  if(!event.eventName || !(/\S/.test(event.eventName))){
    errorMessage = errorMessage + 'Name ';
  }
  if(!event.eventVenue || !(/\S/.test(event.eventVenue))){
    errorMessage = errorMessage + 'Venue ';
  }
  if(!event.eventDateTime || !(/\S/.test(event.eventDateTime))){
    errorMessage = errorMessage + 'Date time ';
  }
  if(!event.eventDetails || !(/\S/.test(event.eventDetails))){
    errorMessage = errorMessage + 'Details ';
  }
  if(errorMessage != ''){
    errorMessage = errorMessage + 'field empty';
    return {code: 406, result: errorMessage};
  }
  events[nextEventId] = { eventId: nextEventId, eventName: event.eventName, eventOrganizer: event.eventOrganizer,
    eventVenue: event.eventVenue, eventDateTime: event.eventDateTime, eventDetails: event.eventDetails,
    invitees: event.invitees, attending: 0, notAttending: 0};
  return {code: 0, result: events[nextEventId]};
};

const updateEvent = ( event ) => {
  let errorMessage = '';
  if(!event.eventName || !(/\S/.test(event.eventName))){
    errorMessage = errorMessage + 'Name ';
  }
  if(!event.eventVenue || !(/\S/.test(event.eventVenue))){
    errorMessage = errorMessage + 'Venue ';
  }
  if(!event.eventDateTime || !(/\S/.test(event.eventDateTime))){
    errorMessage = errorMessage + 'Date time ';
  }
  if(!event.eventDetails || !(/\S/.test(event.eventDetails))){
    errorMessage = errorMessage + 'Details ';
  }
  if(errorMessage != ''){
    errorMessage = errorMessage + 'field empty';
    return {code: 406, result: errorMessage};
  }
  events[event.eventId] = { eventId: event.eventId, eventName: event.eventName, eventOrganizer: event.eventOrganizer,
    eventVenue: event.eventVenue, eventDateTime: event.eventDateTime, eventDetails: event.eventDetails,
    invitees: event.invitees, attending: 0, notAttending: 0};
  return {code: 0, result: events[event.eventId]};
};

const getEvents = () => {
  return events;
};

const getEvent = (eventId) => {
  if(!events[eventId]){
    return 403;
  }
  return events[eventId];
};

const updateEventResponse = (eventRespone, prevResponse) => {
  const event = events[eventRespone.eventId];
  if (prevResponse === '') {
    if(eventRespone.isAttending === 'yes'){
      event.attending = event.attending + 1;
    } else if(eventRespone.isAttending === 'no'){
        event.notAttending = event.notAttending + 1;
      }
  } else if (prevResponse === 'yes'){
      if(eventRespone.isAttending === 'no') {
        event.notAttending = event.notAttending + 1;
        event.attending = event.attending - 1;
      }
    } else if (prevResponse === 'no'){
        if(eventRespone.isAttending === 'yes') {
          event.notAttending = event.notAttending - 1;
          event.attending = event.attending + 1;
        }
      }
};

const deleteEvent = (eventId) => {
  const event = events[eventId];
  delete events[eventId];
  return event;
};

module.exports = {
  events,
  getEvent,
  getEvents,
  addEvent,
  updateEvent,
  updateEventResponse,
  deleteEvent,
};