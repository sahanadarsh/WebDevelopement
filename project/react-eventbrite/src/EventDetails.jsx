import React from 'react';
import { fetchEvents } from './services';

const EventDetails = ( {userState, event, onHomePage} ) => {

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
        <div>
            <a  className="back-home" href="https://eventrralogin.com" title="click here to go back to home page" onClick={e => getEvents(e) }>Back Home</a>
            <div className="event-details">
                <div>
                    <h2 className="event-titles"><u>Event Name</u></h2>
                    <div className="event-name"><span>{event.eventName}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>Host</u></h2>
                    <div className="event-organizer"><span>{event.eventOrganizer}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>Venue</u></h2>
                    <div className="event-venue"><span>{event.eventVenue}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>Date and Time</u></h2>
                    <div className="event-data-time"><span>{event.eventDateTime}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>Event Details</u></h2>
                    <div className="more-details"><span>{event.eventDetails}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>invitees</u></h2>
                    {Object.values(event.invitees).map( (invitee, index) => (
                    <div className="more-details" key={index}><span>{invitee}</span></div>
                    ))}
                </div>
                <div>
                    <h2 className="event-titles"><u>Attending</u></h2>
                    <div className="attending"><span>{event.attending}</span></div>
                </div>
                <div>
                    <h2 className="event-titles"><u>Not Attending</u></h2>
                    <div className="not-attending"><span>{event.notAttending}</span></div>
                </div>
            </div>
        </div>
    );

};

export default EventDetails;