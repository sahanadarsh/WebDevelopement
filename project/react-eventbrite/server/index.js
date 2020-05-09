const express = require('express');
const cookieParser = require('cookie-parser');
const { users, getUser, addUser, updateResponse, deleteUser, getInvitedEvents, getCreatedEvents, addEventIdToInvitedList, addEventIdToCreatedList, deleteInvitedEvent, deleteFromCreatedList, deleteFromInvitedList } = require('./users-list');
const { getEvent, addEvent, updateEvent, updateEventResponse, deleteEvent} = require('./events');
const auth = require('./auth');

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'LOGIN_REQUIRED' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
		return;
	}
	res.status(200).json(users[sid]);
});

app.post('/registration', express.json(), (req, res) => {
	const username = req.body.username;
	res.clearCookie('sid');
	if(!username) {
		res.status(400).json({ code: 'USERNAME_REQUIRED' });
		return;
	}
	if(!auth.isPermitted(username)) {
		res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
		return;
	}
	const useroutput = addUser(username);
	if(useroutput === 401){
		res.status(401).json({ code: 'USERNAME_ALREADY_EXIST' });
		return;
	}
	res.cookie('sid', useroutput.uid);
	res.status(200).json(useroutput);
});

app.post('/session', express.json(), (req, res) => {
	const username = req.body.username;
	res.clearCookie('sid');
	if(!username) {
		res.status(400).json({ code: 'USERNAME_REQUIRED' });
		return;
	}
	const response = getUser(username);
	if(response === 401){
		res.status(401).json({ code: 'REGISTRATION_REQUIRED' });
		return;
	}
	res.cookie('sid', response.uid);
	res.status(200).json(response);
});

app.get('/users', (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'LOGIN_REQUIRED' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
		return;
	}
	res.status(200).json(users);
});

app.get('/events/:username', (req, res) => {
	const sid = req.cookies.sid;
	const username = req.params.username;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const createdEventsForUser = getCreatedEvents(username);
	const invitedEventsForUser = getInvitedEvents(username);
	res.json({createdEvents: createdEventsForUser, invitedEvents: invitedEventsForUser});
});

app.get('/event/:eventId', (req, res) => {
	const sid = req.cookies.sid;
	const eventId = req.params.eventId;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const response = getEvent(eventId);
	if(response === 403){
		res.status(403).json({ code: 'EVENT_DOESNOT_EXIST' });
		return;
	}
	res.json(getEvent(eventId));
});

app.post('/event', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const event = req.body;
	const addedEvent = addEvent(event);
	if(addedEvent.code === 406){
		res.status(406).json({ code: addedEvent.result});
		return;
	}
	const newEvent = addedEvent.result;
	addEventIdToCreatedList(newEvent.eventOrganizer, newEvent.eventId);
	addEventIdToInvitedList(newEvent.invitees, newEvent.eventId);
	res.json(newEvent);
});

app.put('/event', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const event = req.body;
	const oldEvent = getEvent(event.eventId);
	deleteFromInvitedList(oldEvent.eventId, oldEvent.invitees);
	const updatedEvent = updateEvent(event);
	if(updatedEvent.code === 406){
		res.status(406).json({ code: updatedEvent.result});
		return;
	}
	const newEvent = updatedEvent.result;
	addEventIdToInvitedList(newEvent.invitees, newEvent.eventId);
	res.json(newEvent);
});

app.put('/response', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const eventResponse = req.body;
	let prevResponse = updateResponse(eventResponse);
	updateEventResponse(eventResponse, prevResponse);
	const createdEventsForUser = getCreatedEvents(eventResponse.username);
	const invitedEventsForUser = getInvitedEvents(eventResponse.username);
	res.json({createdEvents: createdEventsForUser, invitedEvents: invitedEventsForUser});
});

app.delete('/event/:eventId', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	const eventId = req.params.eventId;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	const deletedEvent = deleteEvent(eventId);
	deleteFromCreatedList(eventId, deletedEvent.eventOrganizer);
	deleteFromInvitedList(eventId, deletedEvent.invitees);
	res.sendStatus(200);
});

app.delete('/:username/event/:eventId', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	const eventId = req.params.eventId;
	const username = req.params.username;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	deleteInvitedEvent(username, eventId);
	res.sendStatus(200);
});

app.delete('/session', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	res.clearCookie('sid');
	res.sendStatus(200);
});

app.delete('/registration', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	if(!sid) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[sid]) {
		res.clearCookie('sid');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	res.clearCookie('sid');
	deleteUser(sid);
	res.sendStatus(200);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );