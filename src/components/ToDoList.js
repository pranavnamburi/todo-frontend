import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddToDoForm from './AddToDoForm';

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todoappfunc.azurewebsites.net/api/get_todos?');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      alert('Failed to fetch todos');
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (rowKey) => {
    setTodos(todos.filter(todo => todo.RowKey !== rowKey));
  };

  const handleToggleCompleted = (rowKey) => {
    setTodos(todos.map(todo => {
      if (todo.RowKey === rowKey) {
        return { ...todo, Completed: !todo.Completed };
      }
      return todo;
    }));
  };

  return (
    <div>
      <AddToDoForm onAdd={handleAddTodo} />
      {todos.map(todo => (
        <ToDoItem key={todo.RowKey} todo={todo} onDelete={handleDelete} onToggleCompleted={handleToggleCompleted} />
      ))}
    </div>
  );
}

export default ToDoList;
