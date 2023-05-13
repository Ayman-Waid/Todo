import { useState } from "react"

function Task_list({ id, text, complete ,deleteTodo, time,pre_update }) {
 



  return (
    <div className={"todo" + (complete ? " is-complete" : "")} key={id} >
      <div className="checkbox"></div>
      <div className="text">{text} <span className='date'> {time}</span></div>
      <div className="button-modify" onClick={() => deleteTodo(id)}>Delete</div>
      <div className="button-modify" onClick={()=>pre_update(id)}>Update</div>
    </div>
  )
}
export default Task_list