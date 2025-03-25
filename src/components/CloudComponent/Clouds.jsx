// Clouds.jsx
import React, { useEffect, useState } from 'react';

const Cloud = ({ style }) => {
  return <div className="cloud" style={style}></div>;
};

const generateRandomCloud = (width, height) => {
  const randomTop = Math.random() * height;
  const randomLeft = -100; // Start off-screen to the left
  const randomDuration = 120 + Math.random() * 120; // Random duration between 10s and 30s

  return {
    top: `${randomTop}px`,
    left: `${randomLeft}px`,
    animationDuration: `${randomDuration}s`,
  };
};

const Clouds = ({ numClouds }) => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;

    const initialClouds = Array.from({ length: numClouds }).map(() =>
      generateRandomCloud(width, height)
    );
    setClouds(initialClouds);

    const interval = setInterval(() => {
      setClouds((prevClouds) => [
        ...prevClouds,
        generateRandomCloud(width, height),
      ]);
    }, 100000); // Add a new cloud every 10 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, [numClouds]);

  return (
    <div className="clouds-container">
      {clouds.map((cloud, index) => (
        <Cloud key={index} style={cloud} />
      ))}
    </div>
  );
};

export default Clouds;
