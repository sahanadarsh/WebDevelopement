import React from 'react';
import Logout from './Logout';
import DeleteAccount from './DeleteAccount';
import CreatedEventsList from './CreatedEventsList';
import InvitedEventsList from './InvitedEventsList';
import { fetchRegisteredUsers, fetchEvents } from './services';

const Components = ( {userState, onCreateEvent, onEventDetails, onLogout, onUpdateEvents, onEventUpdate} ) => {

	const createEventPage = () => {
		fetchRegisteredUsers()
		.then( (users) => {
			onCreateEvent(users, '');
		})
		.catch( (err) => {
			onCreateEvent({}, err.code );
		});
    };

    const getEvents = () => {
        fetchEvents(userState.username)
        .then( (events) => {
            onUpdateEvents(events.createdEvents, events.invitedEvents, '');
        })
        .catch( (err) => {
            onUpdateEvents([], [], err.code);
        });
    }

    return (
        <div>
            <div className="container">
                <DeleteAccount user={userState} onDelete={onLogout}/>
                <Logout user={userState} onLoggingOut={onLogout}/>
                <button className="refresh-button" title="click here to refresh" onClick={ getEvents }>Refresh</button>
                <button className="create-event-button" title="click here to create new event" onClick={ createEventPage }>Create Event</button>
            </div>
            <div className="created-invited-events">
                <CreatedEventsList user={userState} onGettingEventDetails = {onEventDetails} updateLists = {onUpdateEvents} eventUpdate={onEventUpdate}/>
                <InvitedEventsList user={userState} onGettingEventDetails = {onEventDetails} updateLists = {onUpdateEvents}/>
            </div>
        </div>
    );

};

export default Components;