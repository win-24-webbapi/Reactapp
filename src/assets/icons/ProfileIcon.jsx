import React from 'react';

export default function ProfileIcon({ width = 22, height = 22, fillColor = "#DDDAF9", strokeColor = "#707DBF" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="8" r="4" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
      <ellipse cx="11" cy="17" rx="6" ry="3" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
    </svg>
  );
} 