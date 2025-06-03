'use client';
import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTodos([...todos, { text: task, done: false }]);
      setTask('');
    }
  };

  const toggleDone = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '10px' }}>MY To-Do List 📝</h1>
      <form onSubmit={addTodo} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(i)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(i)}> Remove ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
