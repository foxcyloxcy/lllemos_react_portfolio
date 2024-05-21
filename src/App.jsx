// App.jsx
import React from 'react';
import Homepage from './pages/Homepage.jsx';
import { useEffect, useState } from 'react';
import Sun from './components/SunComponent/Sun.jsx';
import Moon from './components/MoonComponent/Moon.jsx';
import Clouds from './components/CloudComponent/Clouds.jsx';
import Stars from './components/StarComponent/Stars.jsx';

function App() {
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0 });
  const [hideSun, setHideSun] = useState(false);
  const [hideMoon, setHideMoon] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [hoverClass, setHoverClass] = useState("");
  const [borderClass, setBorderClass] = useState("");

  const nightHoverClass = 'hover:bg-gray-900/70';
  const dayHoverClass = 'hover:bg-neutral-100/70';

  const nightBorderClass = 'border-gray-500';
  const dayBorderClass = 'border-yellow-300';

  useEffect(() => {
    const body = document.body;

    if (isNight) {
      body.classList.add('bg-slate-800', 'text-yellow-300');
      body.classList.remove('bg-sky-300', 'text-orange-700');
      setHoverClass(nightHoverClass);
      setBorderClass(nightBorderClass);
    } else {
      body.classList.add('bg-sky-300', 'text-orange-700');
      body.classList.remove('bg-slate-800', 'text-yellow-300');
      setHoverClass(dayHoverClass);
      setBorderClass(dayBorderClass);
    }
  }, [isNight]);

  useEffect(() => {
    const updatePositions = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Calculate angles
      const angle = (hour % 12) * 30 + minute / 2;

      // Calculate positions on a circle
      const sunX = Math.cos((angle - 90) * (Math.PI / 180)) * 50 + 50;
      const sunY = Math.sin((angle - 90) * (Math.PI / 180)) * 50 + 50;
      const moonX = Math.cos((angle - 90) * (Math.PI / 180)) * 50 + 50;
      const moonY = Math.sin((angle - 90) * (Math.PI / 180)) * 50 + 50;

      // Set positions
      setSunPosition({ x: sunX, y: sunY });
      setMoonPosition({ x: moonX, y: moonY });

      // Set visibility based on time
      const nightTime = hour < 6 || hour >= 18;
      setHideSun(nightTime);
      setHideMoon(!nightTime);
      setIsNight(nightTime);

      // Update local storage
      localStorage.setItem('isNight', JSON.stringify(nightTime));
    };

    // Fetch initial night status from local storage
    const nightTime = JSON.parse(localStorage.getItem('isNight')) || false;
    setIsNight(nightTime);

    // Initial update and set interval
    updatePositions();
    const intervalId = setInterval(updatePositions, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const numClouds = Math.floor(Math.random() * 6) + 5;

  return (
    <div className="app-container">
      {!hideSun && <Sun position={sunPosition} />}
      {!isNight && <Clouds numClouds={numClouds} />}

      {!hideMoon && <Moon position={moonPosition} />}
	  {isNight && <Stars numStars={20} />}
      
      <Homepage hoverClass={hoverClass} borderClass={borderClass} />
    </div>
  );
}

export default App;
