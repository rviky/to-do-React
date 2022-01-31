import React from 'react';

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
        var todoElement = document.getElementById(todo.id)
        if (todo.complete === true) 
            todoElement.style.setProperty("text-decoration", "line-through");
        else 
        todoElement.style.setProperty("text-decoration", "");
        
    }
  return (
      <div>
          <label>
            <input type="checkbox" className='form-check-input'  checked={todo.complete} onChange={handleTodoClick} />&nbsp;
            <span id={todo.id}>{todo.name}</span>
          </label>
      </div>

    
  )
}
