import React from 'react'

function Updatepopup({updatepopup,setupdatepopup,modify,setUpdatedTodo,updatedtodo,myid}) {
  return (
    <div className={updatepopup?"display":"hadden"}>
       <div className='updatediv'>
          <h3>Update Task</h3>
          <p onClick={()=>{setupdatepopup(false)}}>X</p>
          <input type='text' onChange={e => setUpdatedTodo(e.target.value)} value={updatedtodo} />
          <button onClick={()=>{modify(myid); setupdatepopup(false)}}>update</button>
       </div>
      </div>

  )
}

export default Updatepopup
