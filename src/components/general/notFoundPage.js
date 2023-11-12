import React from 'react';
import './NotFoundPage.css'; 
const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for isn't here.</p>
            <a href="/">Go Home</a>
        </div>
    );
};

export default NotFoundPage;
