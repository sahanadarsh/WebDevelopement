import React from 'react';

import { fetchDelete } from './services';

const Logout = ({ user, onDelete }) => {

	const logout = () => {
		fetchDelete()
		.then( () => {
			onDelete('');
		})
		.catch( (err) => {
			onDelete(err.code);
		});
	};

	return (
		<div className='Logout'>
			{ user.isLoggedIn &&
				<button className="delete-account-button" title="click here to delete your account" onClick={logout}>Delete Account</button> }
		</div>
   );

};

export default Logout;