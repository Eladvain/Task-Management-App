import React, { useEffect, useState } from 'react'
import editTask from '../CSS/editTask.css'
import TaskItem from './TaskItem';
import { useLocation } from "react-router-dom";

const EditTask = () => {

  const [statusChecked, setStatusChecked] = useState(false);
  const [descChecked, setDescChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);

  const location = useLocation();
  const {task} = location.state;

  // useEffect(() => {
  //   async function updateTaskList(){
  //     console.log("in useEffect of edit task");
  //     console.log("statusChecked in useEffect = "+statusChecked);
  //     if(statusChecked === true){

  //     }
    
  //   }
    
  //   updateTaskList();
  // },[statusChecked]);


  const handleChangeStatus = async () => {
    if(statusChecked === false){
      setDescChecked(false);
      setNameChecked(false)
    }
    setStatusChecked(!statusChecked);
  };
  const handleChangedDesc = async () => {
    if(descChecked === false){
      setStatusChecked(false);
      setNameChecked(false);
    }
    setDescChecked(!descChecked);
  };
  const handleChangedName = async () => {
    if(nameChecked === false){
      setStatusChecked(false);
      setDescChecked(false)
    }
    setNameChecked(!nameChecked);
  };


  return (
    <div className='div-container'>
      <div className='task-div'>
      <TaskItem  taskItem={task}/>
      </div>
      <div className='task-update'> 
        <h1 className='choose-update'>choose which field to update</h1>
        <label htmlFor='status'>Status:</label> 
        <input type="checkbox"
              id="status" 
              checked={statusChecked}
              onChange={handleChangeStatus}>
        </input>
        <label htmlFor='status'>Description:</label> 
        <input type="checkbox"
              id="description" 
              checked={descChecked}
              onChange={handleChangedDesc}>
        </input>
        <label htmlFor='status'>Name:</label> 
        <input type="checkbox"
              id="name" 
              checked={nameChecked}
              onChange={handleChangedName}>
        </input>
        </div>
        {statusChecked === true ? 
        <div className='update-status'>
        <div className='updateStatus'>
            <label id ='status-label' htmlFor="status-select">Choose status of task: </label>

            <select name="status_task" id="status-select">
            <option value="">--Please choose an option--</option>
            <option value="">In process</option>
            <option value="">Done</option>
            </select>
            </div>
          <button className='submit-button'>update</button>
        </div>
        :""}
          {descChecked === true ? 
        <div className='update-description'>
          <div className='updateDescription'>
            <label id="description-label" htmlFor="description-label">change description to task:   </label>
            <textarea id="description-textarea" name="" rows="4" maxLength="100" placeholder='type here...'></textarea>
          </div>
          <button className='submit-button'>update</button>
        </div>
        
        :""}
        
        {nameChecked === true ? 
        <div className='update-name'>
            <div className='updateName'>
            <label id="name-label" htmlFor="name-label">change name of task:   </label>
            <input type="text" id="name-input" name="name-input"></input>
            </div>
          <button className='submit-button'>update</button>
        </div>
        :""}
     </div>   
    
  )
}

export default EditTask
