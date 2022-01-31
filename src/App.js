import React, { useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
 

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todos => todos.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

 


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    var textBox = document.getElementById("textBox")
    if (name === '') return
      var originalContent = textBox.innerHTML
      textBox.innerHTML = "Notes Saved!"
      textBox.style.setProperty("color","green")
      setTimeout(function() {
        textBox.innerHTML = originalContent
      }, 2000)
    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(),name:name,complete:false}]
    })
    todoNameRef.current.value = null
    
  }


  function clearCompleted() {
    const newTodos = todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      
        <div className="mb-3">
          <h2>To Do List </h2>
          <textarea placeholder='Enter your to do notes here' className="form-control form-control-lg mb-3" required  type="text" ref={todoNameRef} />
          <p id='textBox'></p>
        </div>
        <div className='mr-tp'>
          <button type="submit" className="btn btn-primary"  onClick={handleAddTodo}>Add Todo</button> &nbsp;
          <button type="submit" className="btn btn-danger"  onClick={clearCompleted}>Clear Completed</button>
        </div>
      
      <p className='pad-top-10'>{todos.filter(todo=> !todo.complete).length} left to do</p>
      <br></br>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
