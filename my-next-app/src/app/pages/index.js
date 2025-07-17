import { useState } from 'react';
import { db } from '../lib/db';

export default function Home({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });
    const added = await res.json();
    setTodos([...todos, added]);
    setNewTodo('');
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)));
  };

  return (
    <div>
      <h1>TODO List</h1>
      <form onSubmit={addTodo}>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="New TODO" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const todos = await db('todos').select('*');
  return { props: { initialTodos: todos } };
}