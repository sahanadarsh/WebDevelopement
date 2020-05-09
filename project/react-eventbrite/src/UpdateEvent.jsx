import React, {useState} from 'react';
import { fetchEvents, fetchUpdateEvent, fetchEventById, fetchDeleteCreatedEvent } from './services';

const UpdateEvent = ( {userState, event, allUsers, onHomePage, onEventDetails} ) => {

    const [eventName, setEventName] = useState(event.eventName);
    const [eventVenue, setEventVenue] = useState(event.eventVenue);
    const [eventDateTime, setEventDateTime] = useState(event.eventDateTime);
    const [eventDetails, setEventDetails] = useState(event.eventDetails);

    const users = Object.keys(allUsers);
    let selectedInvitees = [];

    const performAction = () => {
        const invitees = document.querySelector('#invitees');
        if(users.length > 1){
            selectedInvitees = [].filter.call(invitees.options, option => option.selected).map(option => option.text);
        }

        fetchUpdateEvent(eventName, event.eventId, userState.username, eventVenue, eventDateTime, eventDetails, selectedInvitees)
        .then( (event) => {
            fetchEventById(event.eventId)
            .then( (event) => {
                onEventDetails(event, '');
            })
            .catch( (err) => {
                onEventDetails({}, err.code);
            });
        })
        .catch( (err) => {
            onEventDetails({}, err.code);
        }); 
    };

    const getEvents = (e) => {
		e.preventDefault();
		fetchEvents(userState.username)
		.then( (events) => {
			onHomePage(events.createdEvents, events.invitedEvents, '');
		})
		.catch( (err) => {
			onHomePage([], [], err.code);
		});
	}

    return (
        <div className="new-event">
            <div className="back-to-home">
                <a  className="back-home" href="https://eventrra.com" title="click here to go back to home page" onClick={e => getEvents(e) }>Back Home</a>
            </div>
            <div className="new-event-page">
                <div className="event-name">
                    <p className="new-event-titles">EVENT NAME*</p>
                    <textarea className="new-event-name" id="name" value={eventName} onChange={e => setEventName(e.target.value)} name="name" rows="2" cols="150"></textarea>
                </div>
                <div className="event-venue">
                    <p className="new-event-titles">EVENT VENUE*</p>
                    <textarea className="new-event-venue" id="venue" value={eventVenue} onChange={e => setEventVenue(e.target.value)} name="name" rows="2" cols="150"></textarea>
                </div>
                <div className="event-date-time">
                    <p className="new-event-titles">EVENT DATE TIME*</p>
                    <textarea className="new-event-venue" id="dateAndTime" value={eventDateTime} onChange={e => setEventDateTime(e.target.value)} name="name" rows="2" cols="150"></textarea>
                </div>
                <div className="details-event">
                    <p className="new-event-titles">EVENT DETAILS*</p>
                    <textarea className="new-event-details" id="eventDetails" value={eventDetails} onChange={e => setEventDetails(e.target.value)} name="ingredients" rows="5" cols="150"></textarea>
                </div>
                { users.length <= 1 ? <p>Sorry, Didn't find any invitees. You can update event now, later You can add invitees!</p> :
                    <div>
                        <p className="warning">Hold down the Ctrl (windows) or Command (Mac) button to select multiple users</p>
                        <div className="select-users">
                            <label className="users">Select users to invite:</label>
                            <select className="filter-drop-down" id="invitees" multiple size="allUsers.length">
                            <option value='' disabled hidden>Choose here to filter</option>
                            {Object.values(allUsers).filter(user => user.username !== userState.username).map( (user,index) => (
                                    <option key={index} value={user.username}>{user.username}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
            </div>
            <button className="recipe-submit-button" type="submit" onClick={ performAction }>Submit</button>
        </div>
    );

};

export default UpdateEvent;