import React from 'react';
import { fetchEventById, fetchDeleteCreatedEvent, fetchEvents,fetchRegisteredUsers } from './services';

const CreatedEventsList = ( {user, onGettingEventDetails, updateLists, eventUpdate} ) => {

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
		fetchDeleteCreatedEvent(eventId)
		.then( () => {
			fetchEvents(user.username)
			.then( (events) => {
				updateLists(events.createdEvents, events.invitedEvents, '');
			})
			.catch( (err) => {
				updateLists([], [], err.code);
			});
		})
		.catch( (err) => {
			updateLists([], [], err.code);
		});
	}

	const performUpdateEventAction = (e, event) => {
		e.preventDefault();
		fetchRegisteredUsers()
		.then( (users) => {
			eventUpdate(event, users, '');
		})
		.catch( (err) => {
			eventUpdate({}, {}, err.code);
		});
	}

    return (
        <div>
            <div className="heading">
                <h1 className="events-heading"><u>Created Events</u></h1>
            </div>
            {(user.createdEvents.length === 0) ?
                <p className="empty-list">Hi! you dont have any events created. Click "create event" button to create a new event</p> :
                <ul className="events">
                    {Object.values(user.createdEvents).map( (createdEvent,index) => (
                    <li key={index}>
                        <div className="event">
                            <div>
                                <a  className="event-name" href="https://event1.com" title="click to get detail of event" onClick={ e => getEventDetails(e, createdEvent.eventId) }>{createdEvent.eventName}</a>
                            </div>
                            <div>
                                Venue:{' '}
                                <span className="event-name">{createdEvent.eventVenue}</span>
                            </div>
                            <div>
                                Date Time:{' '}
                                <span className="event-name">{createdEvent.eventDateTime}</span>
                            </div>
                            <div className="delete-event">
                                <button className="delete-event-button" onClick={e => performDeleteEventAction(e, createdEvent.eventId)}>Delete Event</button>
                                <button className="update-event-button" onClick={e => performUpdateEventAction(e, createdEvent)}>Update Event</button>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default CreatedEventsList;