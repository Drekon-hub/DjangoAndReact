import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api.js';
import { TasksCarts } from './TasksCarts.jsx';
export function TasksList() {
  const [tasks, useTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      useTasks(res.data);
      console.log(res.data);
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TasksCarts key={task.id} task={task} />
      ))}
    </div>
  );
}
