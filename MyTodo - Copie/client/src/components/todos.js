import React from 'react'





function Todos(props) {
    const {id , text , complete,deleteTodo,modify,completeTodo,time} = props;


    

    const timestamp = Date.now(); // Get the current timestamp
    const date = new Date(timestamp); // Create a new Date object from the timestamp
    
    const year = date.getFullYear(); // Get the year (4 digits)
    const month = date.getMonth() + 1; // Get the month (0-11), add 1 to convert to 1-12
    const day = date.getDate(); // Get the day of the month (1-31)
    const hours = date.getHours(); // Get the hours (0-23)
    const minutes = date.getMinutes(); // Get the minutes (0-59)
    const seconds = date.getSeconds(); // Get the seconds (0-59)
    
    // Construct the date string in the format "YYYY-MM-DD HH:MM:SS"
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={"todo" + (complete ? " is-complete" : "")} key={id} onClick={() => completeTodo(id)}>
            <div className="checkbox"></div>
            <div className="text">{text}  <span className='date'> {dateString}</span></div>
            <div className="button-modify" onClick={() => deleteTodo(id)}>Delete</div>
            <div className="button-modify" onClick={() => modify(id)}>Update</div>
            
    </div>
  )
}

export default Todos;
