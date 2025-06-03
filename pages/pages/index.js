import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List 📝</h1>

      <form onSubmit={addTodo}>
        <input
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => removeTodo(i)}>✅ Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// This is a simple To-Do List application built with React.
// It allows users to add tasks, view them in a list, and mark them as done.