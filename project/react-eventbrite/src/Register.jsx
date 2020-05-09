import React, { useState } from 'react';
import { fetchRegister } from './services';

const Register = ({ onRegister }) => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const performRegister = () => {
		if(!firstName) {
			onRegister('FIRSTNAME_REQUIRED');
			return;
		}
		if(!lastName) {
			onRegister('LASTNAME_REQUIRED');
			return;
		}
		fetchRegister( firstName.concat(lastName))
		.then( () => {
			setFirstName('');
			setLastName('');
			onRegister('');
		})
		.catch( (err) => {
			setFirstName('');
			setLastName('');
			onRegister(err.code);
		});
	};

	const getLoginPage = (e) => {
		e.preventDefault();
		onRegister('');
	}

  return (
    <div className="register">
      <input className="first-name" value={firstName} placeholder="first name" onChange={ (e) => setFirstName(e.target.value) }/>
      <input className="last-name" value={lastName} placeholder="last name" onChange={ (e) => setLastName(e.target.value) }/>
      <button className="register-button" onClick={ performRegister }>Register</button>
      <a  className="back-login" href="https://eventrralogin.com" title="click this to login if you already have an account" onClick={e => getLoginPage(e) }>Already have Account? Click here to Login</a>
    </div>
  );

};

export default Register;