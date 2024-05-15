import React from 'react';

const Sun = ({ position }) => {
  return (
    <div
      id="sun"
      style={{
        position: 'absolute',
        top: `${position.y}%`,
        left: `${position.x}%`,
        // Add other styles as needed
      }}
    >
      {/* Sun component content */}
    </div>
  );
};

export default Sun;