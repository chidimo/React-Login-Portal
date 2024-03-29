import React from 'react';

const ErrorBoundary = props => {
    return (
    <div>
        <h3>Error: 404</h3>
        <p>The requested url <code>{ props.history.location.pathname }</code> was not found.</p>
    </div>
)}

export default ErrorBoundary
