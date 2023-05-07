import Todos from './components/todos';
import Popup from './components/Popup';
import { useEffect, useState } from 'react';
import myLogo from './LOGO.png';
const api_base = 'http://localhost:3001';

function App() {
  // state variables
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // get todos on component mount
  useEffect(() => {
    fetch(api_base + '/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  // mark todo as complete
  const completeTodo = async id => {
    const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());
   
    setTodos(todos => todos.map(todo => {
      if (todo._id == data._id) {
        
        todo.complete = data.complete;
      }
      return todo;
    }));
  }

  // add new todo
  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
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
    const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
  }


  const modify = async (id) => {
    // open popup to update todo
    const newTodo = prompt("Enter new text for todo:");

    
    if (newTodo !== null && newTodo !== "") {
      // send PUT request to API to update todo
      const data = await fetch(api_base + '/todo/update/' + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodo })
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
         <Todos id = {todo._id} complete = {todo.complete} text = {todo.text} time = {todo.timestamp} 
         deleteTodo = {deleteTodo} modify={modify} completeTodo = {completeTodo} />
        )) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      {/* popup to add new todo */}
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
      <Popup setPopupActive = {setPopupActive} setNewTodo = {setNewTodo} addTodo = {addTodo} 
      popupActive={popupActive} newTodo={newTodo} />
    </div>
  );
}

export default App;
