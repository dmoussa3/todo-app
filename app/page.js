'use client';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second
    return () => clearInterval(interval); 
  }, []);


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
      const newTodo = { text: task, due: dueDate, done: false };
      setTodos([...todos, { text: task, due: dueDate, done: false }]);
      setDueDate('');
      toast.success('Task added!', {
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#fff',
          borderRadius: '8px',
        },
      });

      if (dueDate) {
        const notitTime = new Date(dueDate).getTime() - (15*60*1000); // 15 minutes before due time
        const delay = notitTime - Date.now();
        if (delay > 0) {
          setTimeout(() => {
            if (Notification.permission === 'granted') {
              new Notification('⏰ Task Reminder', {
                body: `Reminder: "${newTodo.text}" is due in 15 minutes!`,
              });
            } else { alert(`Reminder: "${newTodo.text}" is due in 15 minutes!`); }
          }, delay);
        } 
      }
    } else {
      toast.error('Please enter a task!', {
        duration: 3000,
        style: {
          background: '#ef4444',
          color: '#fff',
          borderRadius: '8px',
        },
      });
    }
    setTask('');
  };

  const toggleDone = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );

    toast.success('Task Updated!', {
      duration: 3000,
      style: {
        background: '#10b981',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));

    toast.error('Task Removed!', {
      duration: 3000,
      style: {
        background: '#ef4444',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', backgroundImage:'url(/To-do.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <p style={{ color: 'red', fontFamily: 'initial' }}> {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString() }</p>
      <h1 style={{ marginBottom: '10px', color: 'white', fontSize: '41px', fontFamily: 'helvettica', background: 'blue' }}>MY To-Do List 📝</h1>
      <form onSubmit={addTodo} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '7px'}}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          style={{ width: '200px', height: '22px' }}
        />

        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: '200px', height: '22px' }}
        />

        <button type="submit" style={{ width: '90px', color: 'yellow' }}>Add Task ✅</button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={i} style={{ color:'black', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px', fontSize: '16px', fontFamily: 'sans-serif' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(i)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}> {todo.text} • {todo.due ? `Due: ${new Date(todo.due).toLocaleString()}` : ''} </span>
            <button onClick={() => removeTodo(i)} style={{ fontSize: '12px', color: 'maroon', padding: '1px'}}> Remove ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}