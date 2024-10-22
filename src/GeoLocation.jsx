import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';

const GeolocationReminder = () => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
  const [targetLocation, setTargetLocation] = useState({ latitude: 40.7128, longitude: -74.0060 }); // Example: New York City coordinates
  const [distanceToTarget, setDistanceToTarget] = useState(null);
  const [reminderTriggered, setReminderTriggered] = useState(false);
  const reminderRadius = 500; // Radius in meters to trigger reminder

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          // Calculate distance to target location
          const distance = getDistance(
            { latitude, longitude },
            { latitude: targetLocation.latitude, longitude: targetLocation.longitude }
          );
          setDistanceToTarget(distance);

          // Check if within the reminder radius
          if (distance <= reminderRadius) {
            setReminderTriggered(true);
          }
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, [targetLocation]);

  return (
    <div>
      <h1>Geolocation-based Reminder</h1>
      {currentLocation.latitude && currentLocation.longitude ? (
        <div>
          <p>Your current location: {currentLocation.latitude}, {currentLocation.longitude}</p>
          <p>Distance to target: {distanceToTarget} meters</p>
          {reminderTriggered ? (
            <p style={{ color: 'green' }}>Reminder: You are near your target location!</p>
          ) : (
            <p style={{ color: 'red' }}>You are not near the target location yet.</p>
          )}
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationReminder;
