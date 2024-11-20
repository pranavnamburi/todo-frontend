import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddToDoForm from './AddToDoForm';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://todoappfunc.azurewebsites.net/api/get_todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos');
    } finally {
      setIsLoading(false);
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
      <h1>ToDo List</h1>
      <AddToDoForm onAdd={handleAddTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        todos.map(todo => (
          <ToDoItem key={todo.RowKey} todo={todo} onDelete={handleDelete} onToggleCompleted={handleToggleCompleted} />
        ))
      )}
    </div>
  );
}

export default ToDoList;
