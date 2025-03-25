import React, { useEffect, useState } from 'react';

const Star = ({ style }) => {
  return <div className="star" style={style}></div>;
};

const generateRandomStar = (width, height) => {
  const randomSize = Math.random() * 10 + 2; // Random size between 2 and 8
  const randomTop = Math.random() * height;
  const randomLeft = Math.random() * width;
  const isBlinking = Math.random() < 0.1; // 10% chance of blinking

  return {
    width: `${randomSize}px`,
    height: `${randomSize}px`,
    top: `${randomTop}px`,
    left: `${randomLeft}px`,
    animationDelay: `${Math.random() * 1000}s`, // Random animation delay between 0s and 5s
    opacity: isBlinking ? 0 : 1,
  };
};

const Stars = ({ numStars }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;

    const initialStars = Array.from({ length: numStars }).map(() =>
      generateRandomStar(width, height)
    );
    setStars(initialStars);

    const interval = setInterval(() => {
      setStars((prevStars) => [
        ...prevStars,
        generateRandomStar(width, height),
      ]);
    }, 100000); // Add a new star every 10 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, [numStars]);

  return (
    <div className="stars-container">
      {stars.map((star, index) => (
        <Star key={index} style={star} />
      ))}
    </div>
  );
};

export default Stars;
