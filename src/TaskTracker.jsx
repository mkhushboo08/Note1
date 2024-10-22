import React, { useState } from 'react';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="task-tracker">
      <h2>Task Tracker</h2>
      
      {/* Spacing for the input field */}
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
        style={{ marginBottom: '10px' }} // Space below the input field
      />
      
      {/* Spacing for the button */}
      <button onClick={addTask} style={{ marginBottom: '20px' }}>
        Add Task
      </button>
      
      <ul>
        {tasks.map((task, index) => (
          <li key={index} onClick={() => toggleTaskCompletion(index)}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
