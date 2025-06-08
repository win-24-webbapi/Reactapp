import React from 'react';

export default function NotificationsIcon({ width = 22, height = 22, bgColor = "#A8B4D0", dotColor = "#F26CF9" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="7" width="14" height="8" fill={bgColor} />
      <circle cx="18" cy="8" r="2" fill={dotColor} />
    </svg>
  );
} 