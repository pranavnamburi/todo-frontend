import React from 'react';
import axios from 'axios';

function ToDoItem({ todo, onDelete, onToggleCompleted }) {
  const handleToggleCompleted = async () => {
    try {
      const updatedTodo = await axios.put('https://todoappfunc.azurewebsites.net/api/update_todos', {
        RowKey: todo.RowKey,
        Completed: !todo.Completed
      });
      onToggleCompleted(todo.RowKey, updatedTodo.data.Completed);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('https://todoappfunc.azurewebsites.net/api/delete_todos', {
        data: { RowKey: todo.RowKey }
      });
      onDelete(todo.RowKey);
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className={`todo-item ${todo.Completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.Completed}
        onChange={handleToggleCompleted}
        id={`todo-${todo.RowKey}`}
      />
      <label htmlFor={`todo-${todo.RowKey}`} className="todo-text">{todo.Title}</label>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ToDoItem;
