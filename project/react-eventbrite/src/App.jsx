import React, { useState, useEffect } from 'react';

import { fetchLoginStatus, fetchEvents} from './services';

import Components from './Components';
import CreateEvent from './CreateEvent';
import Register from './Register';
import Login from './Login';
import Error from './Error';
import EventDetails from './EventDetails';
import UpdateEvent from './UpdateEvent';
import './App.css';

const App = () => {
	const [userState, setUserState] = useState({ isLoggedIn: false });
	const [pageState, setPageState] = useState('loginPage');
	const [users, setUsers] = useState({});
	const [event, setEvent] = useState('');
	const [error, setError] = useState('');

	useEffect( () => {
		fetchLoginStatus()
		.then( userInfo => {
			fetchEvents(userInfo.username)
			.then( (events) => {
        setError('');
				setUserState({
					isLoggedIn: true,
					username: userInfo.username,
					createdEvents: events.createdEvents,
					invitedEvents: events.invitedEvents
				});
				setPageState('homePage');
			})
			.catch( (err) => {
				setError(err.code);
			});
		})
	}, []);

	const login = (username, createdEvents, invitedEvents, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setUserState({
				isLoggedIn: true,
				username,
				createdEvents,
				invitedEvents
			});
			setPageState('homePage');
		}
	};

	const register = () => {
    setError('');
		setUserState({
			...userState,
			isLoggedIn: false
		});
		setPageState('registerPage');
	};

	const logout = (errorCode) => {
		setError(errorCode);
		setUserState({
			...userState,
			isLoggedIn: false
		});
		setPageState('loginPage');
	};

	const createEvent = (registeredUsers, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setUsers(registeredUsers);
			setPageState('createEvent');
		}
	}

	const getEventDetails = (event, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setEvent(event);
			setPageState('eventDetails');
		}
	}

	const getLoginPage = (errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setPageState('loginPage');
		}
	}

	const updateEvents = (createdEvents, invitedEvents, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setUserState({
				...userState,
				createdEvents: createdEvents,
				invitedEvents: invitedEvents
			});
		}
	}

	const getHomePage = (createdEvents, invitedEvents, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setUserState({
				...userState,
				createdEvents,
				invitedEvents
			});
			setPageState('homePage');
		}
	}

	const getUpdateEventPage = (event, registeredUsers, errorCode) => {
		setError(errorCode);
		if(!errorCode){
			setEvent(event);
			setUsers(registeredUsers);
			setPageState('updateEvent');
		}
	}

	let content;

	if(pageState === 'registerPage'){
		content = <Register onRegister={getLoginPage}/>;
	}else if(pageState === 'loginPage') {
		content = <Login onLogin={ login } onRegister={register}/>;
	} else if(pageState === 'homePage') {
		content = <Components userState={userState} onCreateEvent={createEvent} onEventDetails={getEventDetails} onLogout={logout} onUpdateEvents={updateEvents} onEventUpdate={getUpdateEventPage}/>;
	} else if(pageState === 'createEvent'){
		content = <CreateEvent userState={userState} allUsers={users} onEventDetails={getEventDetails} onHomePage={getHomePage}/>;
	} else if(pageState === 'eventDetails'){
		content = <EventDetails userState={userState} event={event} onHomePage={getHomePage}/>;
	} else if(pageState === 'updateEvent'){
		content = <UpdateEvent userState={userState} event={event} allUsers={users} onHomePage={getHomePage} onEventDetails={getEventDetails}/>
	}

  return (
    <div className="app">
      <div className="common-heading">
        <h1 className="main-heading">Eventrra</h1>
      </div>
      <p className="sub-heading">Exclusive events, priceless memories</p>
      <Error errorCode={error}/>
      {content}
    </div>
  );

};

export default App;