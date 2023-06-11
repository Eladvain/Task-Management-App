import React from 'react';
import taskItemCss from '../CSS/taskItem.css';

const TaskItem = ({taskItem}) => {
  return (
    <div className='task-container'>
      <h1 className='nameOfTask'>{taskItem.name}</h1>
      <span> {taskItem.description} </span>
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
