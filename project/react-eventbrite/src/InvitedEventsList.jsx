import React, { useState } from 'react';
import { fetchEventById, fetchUpdateResponse, fetchDeleteInvitedEvent, fetchEvents } from './services';

const InvitedEventsList = ( {user, onGettingEventDetails, updateLists} ) => {

	const [response, setResponse] = useState('');

    const performResponseAction = (e,eventId) => {
        e.preventDefault();
        if(!response){
            updateLists([], [], 'Please select yes or no');
        }
		if(response){
            fetchEventById(eventId)
           .then ( () => {
                fetchUpdateResponse(user.username, response, eventId )
                .then( (events) => {
                    setResponse('');
                    updateLists(events.createdEvents, events.invitedEvents, '');
                })
                .catch ( (err) => {
                    setResponse('');
                    updateLists([], [], err.code);
                });
            })
            .catch ( (err) => {
                updateLists([], [], err.code);
            });
		}
    }

	const getEventDetails = (e, eventId) => {
		e.preventDefault();
		fetchEventById(eventId)
		.then( (event) => {
			onGettingEventDetails(event, '');
		})
		.catch( (err) => {
			onGettingEventDetails({}, err.code);
		});
	};

	const performDeleteEventAction = (e, eventId) => {
        e.preventDefault();
        fetchEventById(eventId)
        .then ( () => {
            fetchDeleteInvitedEvent(user.username, eventId)
            .then( () => {
                fetchEvents(user.username)
                .then( (events) => {
                    updateLists(events.createdEvents, events.invitedEvents,'');
                })
                .catch( (err) => {
                    updateLists([], [], err.code);
                });
            })
            .catch( (err) => {
                updateLists([], [], err.code);
            });
        })
        .catch ( (err) => {
            updateLists([], [], err.code);
        });
	}

	const performUpdateResponseAction = (e,eventId) => {
        e.preventDefault();
        fetchEventById(eventId)
        .then ( () => {
            fetchEvents(user.username)
            .then( (events) => {
                Object.values(events.invitedEvents).filter(event => event.event.eventId === eventId).map( (event) => (event.responded = ''));
                updateLists(events.createdEvents, events.invitedEvents, '');
            })
            .catch( (err) => {
                updateLists([], [], err.code);
            });
        })
        .catch ( (err) => {
            updateLists([], [], err.code);
        });
	}

    return (
        <div>
            <div className="heading">
                <h1 className="events-heading"><u>Invited Events</u></h1>
            </div>
            {(user.invitedEvents.length === 0) ?
                <p className="empty-list">Hi! you dont have any invitations:(</p> :
                <ul className="events">
                    {Object.values(user.invitedEvents).map( (invitedEvent,index) => (
                        <li key={index}>
                            <div className="event">
                                <div>
                                    <a  className="event-name" href="https://event1.com" title="click to get detail of event" onClick={ e => getEventDetails(e, invitedEvent.event.eventId) }>{invitedEvent.event.eventName}</a>
                                </div>
                                <div>
                                    Host:{' '}
                                    <span className="event-name">{invitedEvent.event.eventOrganizer}</span>
                                </div>
                                <div>
                                    Venue:{' '}
                                    <span className="event-name">{invitedEvent.event.eventVenue}</span>
                                </div>
                                <div>
                                    Date Time:{' '}
                                    <span className="event-name">{invitedEvent.event.eventDateTime}</span>
                                </div>
                                {(invitedEvent.responded === '')?
                                <span>
                                <div className="response-buttons" onChange={e => setResponse(e.target.value)}>
                                    <p className="response-heading">Select here to respond:</p>
                                    <input type="radio" value="yes" name="response"/> Yes
                                    <input type="radio" value="no" name="response"/> No
                                </div>
                                <div className="response-button">
                                    <button className="submit-response-button" onClick={e => performResponseAction(e, invitedEvent.event.eventId) }>Send Response</button>
                                </div>
                                </span>:
                                <span className="responded-block">
                                    <p className="responded-message">*Responded {invitedEvent.responded} to this event*</p>
                                    <button className="update-response-button" onClick={e => performUpdateResponseAction(e, invitedEvent.event.eventId)}>Update Response</button>
                                </span>}
                                <div className="delete-event">
                                    <button className="delete-event-button" onClick={e => performDeleteEventAction(e, invitedEvent.event.eventId)}>Delete Event</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default InvitedEventsList;