import React, { memo } from 'react';
import './MapPin.css';

const MapPin = () => {
    return (
        <div data-testid="MapPin">
            <div className="pin" data-testid="Pin"></div>
            <div className="pulse" data-testid="Pulse"></div>
        </div>
    );
};

export default memo(MapPin);