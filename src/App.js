//Add State with the useState Hook
//State allows us to track change inside of our React components. 
//A todo list changes quite frequently- lots of states to keep track of
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
//initalise a new state property called todos
//todos: state value itself, setTodos: function 
const [todos, setTodos] = useState([
  //array filled with objects
  {
    content: "Plan the trip to England",
    isCompleted: true,
  },
  {
    content: "Take the vitamin",
    isCompleted: false,
  },
  {
    content: "Finish react project",
    isCompleted: false,
  }
]);
//create a new todo
function handleKeyDown(e, i) {
  if (e.key === 'Enter') {
    createTodoAtIndex(e, i);
  }
  if (e.key === 'Backspace' && todos[i].content === '') {
    e.preventDefault();
    return removeTodoAtIndex(i);
  }
}

function createTodoAtIndex(e, i) {
  const newTodos = [...todos]; //create a copy of the todos state array
  newTodos.splice(i + 1, 0, { //insert a new empty todo
    content: '',
    isCompleted: false,
  });
  setTodos(newTodos);
  setTimeout(() => {
    document.forms[0].elements[i + 1].focus();
  }, 0);
}
//add a timeout delay 
//to the focus to wait for the state to finish updating 
//before focusing on the newly rendered input

//update a todo
function updateTodoAtIndex(e ,i) {
  const newTodos = [...todos];
  newTodos[i].content = e.target.value;
  setTodos(newTodos);
}
//two parameters: event, todo index

function removeTodoAtIndex(i) {
  if (i === 0 && todos.length === 1) return;
  setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
  setTimeout(() => {
    document.forms[0].elements[i - 1].focus();
  }, 0);
}

//complete a todo
function toggleTodoCompleteAtIndex(index) {
  const temporaryTodos = [...todos];
  temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
  setTodos(temporaryTodos);
}

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
          <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
            <div 
              className={'checkbox'} 
              onClick= {() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
            </div>
            <input 
              type="text" 
              value={todo.content}
              onKeyDown={e => handleKeyDown(e, i)} 
              onChange={e => updateTodoAtIndex(e, i)}
              />
          </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
