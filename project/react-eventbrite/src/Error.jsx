import React from 'react';
import messages from './errorMessages';

const Error = ({ errorCode }) => {

  return (
    <div className="errors">
      { errorCode ? <p className="error">{messages[errorCode] || errorCode}</p> : ''}
    </div>
  );

};

export default Error;