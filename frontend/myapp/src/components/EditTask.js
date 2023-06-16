import React, { useEffect, useState } from 'react'
import editTask from '../CSS/editTask.css'
import TaskItem from './TaskItem';
import { useLocation } from "react-router-dom";

const EditTask = () => {

  const [statusChecked, setStatusChecked] = useState(false);
  const [descChecked, setDescChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);

  const [statusOption, setStatusOption] = useState('');
  const [inputName, setInputName] = useState('');
  const [descInput, setDescInput] = useState('');

  const location = useLocation();
  const {task} = location.state;


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

  async function updateTask()
  {
    let updateObject = "";
    let response;
    console.log("in update task");
    if(statusChecked === true && statusOption === "") return;
    if(descChecked === true){
       updateObject = {
        "id" : task.id,
        "field" : "description",
        "value" : `${descInput}`
      }
    }
    else if(nameChecked === true){
      updateObject = {
        "id" : task.id,
        "field" : "name",
        "value" : `${inputName}`
      }
    }
    else if(statusChecked === true && statusOption!==""){
      updateObject = {
        "id" : task.id,
        "field" : "status_task",
        "value" : `${statusOption}`
      }
    }

      try {
        response = await fetch(`http://localhost:2718/tasks/task`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(updateObject)
        })
    } catch (e) {
        console.log("the error is:", e)
    }
    console.log("heree in update task after clicked");
    console.log("response = "+response);
    const update_res = await response.json();
    const update_msg = update_res["msg"];
    console.log("update_msg = "+update_msg);
    
  }

  const changeDescription = (event)=>{
    setDescInput(event.target.value);
    event.preventDefault();
  }
  const changeName = (event)=>{
    setInputName(event.target.value);
    event.preventDefault();
  }
  const changeStatus = (event)=>{
    console.log("status = "+event.target.value)
    setStatusOption(event.target.value);
    event.preventDefault();
  }


  return (
    <div className='div-container'>
      <div className='task-div'>
      <TaskItem  taskItem={task} buttonDel = {false}/>
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

            <select name="status_task" id="status-select" onChange={changeStatus}>
            <option value="">--Please choose an option--</option>
            <option value="In process">In process</option>
            <option value="Done">Done</option>
            </select>
            </div>
          <button className='submit-button' onClick={updateTask}>update</button>
        </div>
        :""}
          {descChecked === true ? 
        <div className='update-description'>
          <div className='updateDescription'>
            <label id="description-label" htmlFor="description-label">change description to task:   </label>
            <textarea id="description-textarea" 
                      name="" 
                      rows="4" 
                      maxLength="100" 
                      placeholder='type here...'
                      onChange={changeDescription}
                      value={descInput}></textarea>
          </div>
          <button className='submit-button' onClick={updateTask}>update</button>
        </div>
        
        :""}
        
        {nameChecked === true ? 
        <div className='update-name'>
            <div className='updateName'>
            <label id="name-label" htmlFor="name-label">change name of task:   </label>
            <input type="text" 
                   id="name-input" 
                   name="name-input"
                   onChange={changeName}
                   value={inputName}>
                   </input>
            </div>
          <button className='submit-button' onClick={updateTask}>update</button>
        </div>
        :""}
     </div>   
    
  )
}

export default EditTask
