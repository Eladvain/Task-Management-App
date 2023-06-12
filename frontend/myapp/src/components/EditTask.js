import React, { useEffect, useState } from 'react'
import editTask from '../CSS/editTask.css'


const EditTask = () => {

  const [statusChecked, setStatusChecked] = useState(false);
  const [descChecked, setDescChecked] = useState(false);

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
    }
    setStatusChecked(!statusChecked);
  };
  const handleChangedDesc = async () => {
    if(descChecked === false){
      setStatusChecked(false);
    }
    setDescChecked(!descChecked);
  };


  return (
    <div>
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
       {statusChecked === true ? 
       <div className='updateStatus'>
        <label htmlFor="status-select">Choose status of task: </label>

        <select name="status_task" id="status-select">
        <option value="">--Please choose an option--</option>
        <option value="">In process</option>
        <option value="">Done</option>
        </select>
       </div>
       :""}
        {descChecked === true ? 
       <div className='updateDescription'>
        <label id="description-label" htmlFor="description-label">change description to task:   </label>
        <textarea id="description-textarea" name="" rows="4" maxLength="100" placeholder='type here...'></textarea>
       </div>
       :""}
      
    </div>
  )
}

export default EditTask
