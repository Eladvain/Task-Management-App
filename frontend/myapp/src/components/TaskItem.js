import React from 'react';
import taskItemCss from '../CSS/taskItem.css';
import { Link, Outlet } from 'react-router-dom'



const TaskItem = ({taskItem, buttonDel, setByStatus, updateTask}) => {

  async function deleteTaskFromList()
{
  let text = "Are you sure you want to remove this task ? ";
  let answer = window.confirm(text);
  if(answer === true)
  {
    let response;
        try {
            response = await fetch(`http://localhost:2718/tasks/task/${taskItem.id}`, {
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json'}
                
            });
        } catch (error){
            console.log('error');
        }
        console.log("after fetch");
        const parsed_response = await response.json();
        console.log(parsed_response["msg"]);
        alert("task removed");
        await updateTask();
  
  }

}


  
  return (
    <div className='task-container'>
      <Link to = "/editTask" state={{task : taskItem}}>edit task</Link>
      <Outlet/>
      <h1 className='nameOfTask'>{taskItem.name}</h1>
      <label> desc :{taskItem.description !== "" ? taskItem.description : "none"}  </label>
      <br/>
      <label>start date : {taskItem.start_date}</label>
      <br/>
      <label>end date : {taskItem.end_date}</label>
      <br/>
      <label>status : {taskItem.status_task}</label>
      <br/><br/>
      {buttonDel === true ? 
        <div className='div-button'>
        <button className='delete-button' onClick={deleteTaskFromList}>Delete</button> 
        </div> : ""
      }
      
    </div>
  )
}

export default TaskItem
