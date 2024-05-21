import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import NotFound from './pages/404'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Sun from './components/SunComponent/Sun.jsx';
import Moon from './components/MoonComponent/Moon.jsx';

export const AppContext = createContext();

function App() {
	const savedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(savedTheme || "dark");

	useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

	const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

	const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
	const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0 });
	const [hideSun, setHideSun] = useState(false);
	const [hideMoon, setHideMoon] = useState(false);
	const [isNight, setIsNight] = useState(false);
  
	useEffect(() => {
	  // Select the body element
	  const body = document.body;
	//   console.log(body.classList[0])
	  // Update the class based on whether it's night time
	  if (isNight) {
		body.classList.add('bg-slate-800');
		body.classList.add('text-yellow-600');
		body.classList.remove('bg-sky-300');
		body.classList.remove('text-orange-700');
	  } else {
		body.classList.add('bg-sky-300');
		body.classList.add('text-orange-700');
		body.classList.remove('bg-slate-800');
		body.classList.remove('text-yellow-600');
  
	  }
	}, [isNight]);
  
	useEffect(() => {
	  const updatePositions = () => {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
  
		// Calculate the angle based on the current hour and minute
		const sunAngle = (hour % 12) * 30 + minute / 2;
		const moonAngle = (hour % 12) * 30 + minute / 2;
  
		// Calculate the positions of the Sun and Moon on a circle
		const sunX = Math.cos((sunAngle - 90) * (Math.PI / 180)) * 50 + 50;
		const sunY = Math.sin((sunAngle - 90) * (Math.PI / 180)) * 50 + 50;
  
		const moonX = Math.cos((moonAngle - 90) * (Math.PI / 180)) * 50 + 50;
		const moonY = Math.sin((moonAngle - 90) * (Math.PI / 180)) * 50 + 50;
  
		// Set the positions of the Sun and Moon
		setSunPosition({ x: sunX, y: sunY });
		setMoonPosition({ x: moonX, y: moonY });
  
		// Determine if it's nighttime to hide the Moon
		setHideMoon(hour >= 6 && hour < 18); // Hide Moon during daytime (6 AM to 5:59 PM)
		// Determine if it's nighttime to hide the Sun
		setHideSun(hour < 6 || hour >= 18); // Hide Sun during nighttime (6 PM to 5:59 AM)
  
		const nightTime = hour < 6 || hour >= 18;
		setIsNight(nightTime);
  
		// Update local storage with night time status
		localStorage.setItem('isNight', JSON.stringify(nightTime));
	  };
  
	  const nightTime = JSON.parse(localStorage.getItem('isNight'));
	  setIsNight(nightTime);
	
	  // Update positions initially and every minute
	  updatePositions();
	  const intervalId = setInterval(updatePositions, 60000);
  
	  return () => clearInterval(intervalId); // Clean up interval on unmount
	}, []);
  

	return (
		<>
		<div className="app-container">
		{!hideSun && <Sun position={sunPosition} />}
		{!hideMoon && <Moon position={moonPosition} />}
		<AppContext.Provider value={{ theme, switchTheme }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
		</div>
		</>

	)
}

export default App
