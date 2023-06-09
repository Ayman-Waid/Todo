import React from 'react'

function Popup( {setPopupActive , setNewTodo , addTodo , popupActive,newTodo}) {
   
  return (
    <div>
      {popupActive && (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Popup
