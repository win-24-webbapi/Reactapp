import React from 'react';
import symbolImg from '../../images/symbol.svg';

export default function VentixeIcon({ width = 22, height = 22 }) {
  return (
    <img 
      src={symbolImg} 
      alt="Ventixe"
      width={width}
      height={height}
      style={{
        objectFit: 'contain'
      }}
    />
  );
} 