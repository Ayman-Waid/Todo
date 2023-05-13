import Task_list from './components/Task_list';
import Popup from './components/Popup';
import { useEffect, useState } from 'react';
import myLogo from './LOGO.png';
import Updatepopup from './components/Updatepopup';
const api_base = 'http://localhost:3001';

function App() {
  // state variables
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [updatepopup , setupdatepopup] = useState(false);
  const [updatedtodo,setUpdatedTodo ] = useState("")
  const [myid,setmyid] = useState("");

  // get todos on component mount
  useEffect(() => {
    fetch(api_base + '/tasks')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  }, []);


  // show up update popup
  const pre_update = (id)=>{
    setupdatepopup(true);
    setmyid(id)

  }



  // add new todo
  const addTodo = async () => {
    const data = await fetch(api_base + '/tasks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo })
    }).then(res => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }

  // delete todo
  const deleteTodo = async id => {
    await fetch(api_base + '/tasks/' + id, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        setTodos(todos => todos.filter(todo => todo._id !== id));
      } else {
        throw new Error('Failed to delete task');
      }
    })
    .catch(error => console.error(error));
  }
  


  const modify = async (myid) => {
   
    if (updatedtodo !== null && updatedtodo !== "") {
      // send PUT request to API to update todo
      const data = await fetch(api_base + '/tasks/update/' + myid, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updatedtodo })
      }).then(res => res.json());
  
      // update state with new todo
      setTodos(todos => todos.map(todo => {
        if (todo._id === data._id) {
          todo.text = data.text;
        }
        return todo;
      }));
    }
  }
  

  return (
    <div className="App">
      {/* logo */}
      <div className='logo'>
        <img src={myLogo} alt="Logo" />
      </div>

      {/* title */}
      <h1>Your tasks</h1>
      
      {/* list of todos */}
      <div className="todos">
        {todos.length > 0 ? todos.map(todo => (
          
         <Task_list id = {todo._id}  text = {todo.text} time = {todo.timestamp} 
         deleteTodo = {deleteTodo} modify={modify}  pre_update = {pre_update} />
        )) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      {/* popup to add new todo */}
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
      <Popup setPopupActive = {setPopupActive} setNewTodo = {setNewTodo} addTodo = {addTodo} 
      popupActive={popupActive} newTodo={newTodo} />
      
     {/* popup to update a todo */}
      <Updatepopup updatepopup= {updatepopup} setupdatepopup = {setupdatepopup} modify={modify}
      setUpdatedTodo = {setUpdatedTodo} updatedtodo={updatedtodo} myid= {myid} />
      </div>

    
  );
}

export default App;


