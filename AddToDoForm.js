import React, { useState } from 'react';
import axios from 'axios';

function AddToDoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;
    try {
      const response = await axios.post('https://todoappfunc.azurewebsites.net/api/add_todos', { Title: title });
      onAdd(response.data);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a new todo" />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddToDoForm;
