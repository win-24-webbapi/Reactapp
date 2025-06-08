import React from 'react';
import eventImg from '../../images/event.svg';

export default function EventsIcon({ width = 22, height = 22 }) {
  return (
    <img 
      src={eventImg} 
      alt="Events"
      width={width}
      height={height}
      style={{
        objectFit: 'contain'
      }}
    />
  );
} 