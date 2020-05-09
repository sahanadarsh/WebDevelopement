import React from 'react';

import { fetchLogout } from './services';

const Logout = ({ user, onLoggingOut }) => {

	const logout = () => {
		fetchLogout()
		.then( () => {
			onLoggingOut('');
		})
		.catch( (err) => {
			onLoggingOut(err.code);
		});
	};

	return (
		<div className='Logout'>
			{ user.isLoggedIn &&
				<button className="logout-button" title="click here to logout" onClick={logout}>Logout</button> }
		</div>
    );

};

export default Logout;