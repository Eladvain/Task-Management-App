import React from 'react';
import taskItemCss from '../CSS/taskItem.css';
import { Link, Outlet } from 'react-router-dom'

const TaskItem = ({taskItem}) => {
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
    </div>
  )
}

export default TaskItem
