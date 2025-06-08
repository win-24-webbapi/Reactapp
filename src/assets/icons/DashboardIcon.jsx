import React from 'react';
import dashboardImg from '../../images/dashbordimg.svg';

export default function DashboardIcon({ width = 22, height = 22 }) {
  return (
    <img 
      src={dashboardImg} 
      alt="Dashboard"
      width={width}
      height={height}
      style={{
        objectFit: 'contain'
      }}
    />
  );
} 