import React from 'react';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <div className="App">
      <ToDoList />  // Ensure this is only called once
    </div>
  );
}

export default App;
