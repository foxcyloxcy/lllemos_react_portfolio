import moonImage from '../../assets/moon.png'
// Moon.jsx
import React from 'react';

const Moon = ({ position }) => {
  return (
    <div
      id="moon"
      style={{
        position: 'absolute',
        top: `${position.y}%`,
        left: `${position.x}%`,
        // Add other styles as needed
      }}
    >
      <img src={moonImage} alt="moon"/>
    </div>
  );
};

export default Moon;
