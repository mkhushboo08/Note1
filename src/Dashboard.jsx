import React from 'react';
import Stopwatch from './Stopwatch';
import TimeStreak from './TimeStreak';
import Notification from './Notification';
import Reminder from './Reminder';
import DocumentLock from './DocumentLock';
import MusicPlayer from './MusicPlayer';
import TaskTracker from './TaskTracker';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <header>
        <h2>Welcome!</h2>
        <button onClick={onLogout}>Logout</button>
      </header>
      
      <main>
        <Stopwatch />
        <TimeStreak />
        <Notification />
        <Reminder />
        <DocumentLock />
        <MusicPlayer />
        <TaskTracker />
        
      </main>
    </div>
  );
};

export default Dashboard;