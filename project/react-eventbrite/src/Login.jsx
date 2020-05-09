import React, { useState } from 'react';
import { fetchLogin, fetchEvents } from './services';

const Login = ({ onLogin, onRegister}) => {

	const [username, setUsername] = useState('');

	const performLogin = () => {
		if(!username) {
			onLogin('', {}, {}, 'USERNAME_REQUIRED');
			return;
		}
		fetchLogin(username)
		.then( (userInfo) => {
			setUsername('');
			fetchEvents(userInfo.username)
			.then( (events) => {
				onLogin(userInfo.username, events.createdEvents, events.invitedEvents, '');
			})
			.catch( (err) => {
				onLogin('', {}, {}, err.code );
			});
		})
		.catch( (err) => {
			setUsername('');
			onLogin('', {}, {}, err.code );
		});
	};

	const performRegister = (e) => {
		e.preventDefault();
		onRegister();
	}

  return (
    <div className="login">
      <input className="username" value={username} placeholder="firstname+lastname" onChange={ (e) => setUsername(e.target.value) }/>
      <button className="login-button" onClick={ performLogin }>Login</button>
      <a  className="register-account" href="https://eventtra.com" title="click to get detail of event" onClick={e => performRegister(e) }>New User? Click here to register</a>
    </div>
  );

};

export default Login;