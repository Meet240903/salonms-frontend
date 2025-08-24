import React from 'react';
import '../assets/style/FullScreenLoader.css';

const FullScreenLoader = () => {
    return (
        <div className="fullscreen-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export default FullScreenLoader;