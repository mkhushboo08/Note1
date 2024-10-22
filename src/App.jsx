import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this imports your CSS
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { getDistance } from 'geolib'; 
import Calendar from './Calendar';
import TaskTracker from './TaskTracker';
import a from './assets/abc.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
  const [distanceToTarget, setDistanceToTarget] = useState(null);
  const [reminderTriggered, setReminderTriggered] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
  const reminderRadius = 500;

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentLocation({ latitude: null, longitude: null });
    setDistanceToTarget(null);
    setReminderTriggered(false);
  };

  // Geolocation logic
  useEffect(() => {
    if (navigator.geolocation && isLoggedIn) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          const distance = getDistance(
            { latitude, longitude },
            { latitude: targetLocation.latitude, longitude: targetLocation.longitude }
          );
          setDistanceToTarget(distance);
          setReminderTriggered(distance <= reminderRadius);
        },
        (error) => console.error('Error fetching location:', error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      
      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount or logout
    }
  }, [isLoggedIn]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  // Smart task detection logic
  const detectSmartTasks = (noteText) => {
    const taskKeywords = ['complete', 'submit', 'finish', 'do', 'call', 'email', 'meet', 'remind'];
    const isTask = taskKeywords.some(keyword => noteText.toLowerCase().includes(keyword));
    if (isTask) {
      setSmartTasks((prevSmartTasks) => [...prevSmartTasks, noteText]);
    }
  };

  return (
    <div className="App">
      <div className="note-app-container">
      <h1>MindMapple</h1>
      <img src={a}></img> 
      <p>This application helps you organize tasks automatically using AI.</p>
      {!isLoggedIn ? (
        <div className="auth-container">
          <Login onLogin={handleLogin} />
          <Signup />
        </div>
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
        {/* <h1>MindMapple</h1>
        <p>This application helps you organize tasks automatically using AI.</p> */}
  
        {/* Display calendar only when logged in */}
        {isLoggedIn && (
          <div className="calendar-section">
            <h2 style={{ textAlign: 'left' }}>Select a specific date for Your Note</h2>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && <p style={{ textAlign: 'left' }}>Selected Date: {selectedDate.toDateString()}</p>}
          </div>
        )}

        {/* Display geolocation-based reminder when logged in */}
        {isLoggedIn && (
          <div className="geolocation-reminder">
            <h2>Geolocation Reminder</h2>
            {currentLocation.latitude && currentLocation .longitude ? (
              <div>
                <p>
                  <strong>Your current location:</strong> {currentLocation.latitude}, {currentLocation.longitude}
                </p>
                <p>
                  <strong>Distance to target:</strong> {distanceToTarget !== null ? `${distanceToTarget} meters` : 'Calculating...'}
                </p>
  
                {/* Show reminder based on proximity */}
                {reminderTriggered ? (
                  <p style={{ color: 'green', fontWeight: 'bold' }}>
                    You are near your target location!
                  </p>
                ) : (
                  <p style={{ color: 'red' }}>You are not near the target location yet.</p>
                )}
              </div>
            ) : (
              <p>Fetching your location...</p>
            )}
          </div>
        )}
      </div>

      {/* {!isLoggedIn ? (
        <div className="auth-container">
          <Login onLogin={handleLogin} />
          <Signup />
        </div>
      ) : (
        <Dashboard onLogout={handleLogout} />
      )} */}
    </div>
  );
}

export default App;