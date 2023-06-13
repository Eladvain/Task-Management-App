import React, { useState } from 'react'
import createTask from '../CSS/createTask.css'

const CreateTask = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");


  const changeName = (event)=>{
    setName(event.target.value);
    event.preventDefault();
  }
  const changeDescription = (event)=>{
    setDescription(event.target.value);
    event.preventDefault();
  }
  const changeEndDate = (event)=>{
    setEndDate(event.target.value);
    event.preventDefault();
  }
  

  return (
    <div className='create-task-div'>
      <h1 className='header-create-task'>create task</h1>
      <div className='updateName'>
        <label id="label" htmlFor="name-label"> Name of task:</label>
        <input type="text" 
               id="input" 
               name="name-input"
               onChange={changeName}
               value={name}>
        </input>
      </div>  
        <div className='updateDescription' >
            <label id="label" htmlFor="description-label"> Description to task:</label>
            <textarea id="input-desc" 
                      name="" 
                      rows="4" 
                      maxLength="100" 
                      placeholder='type here...'
                      onChange={changeDescription}
                      value={description}></textarea>
        </div>
        <div className='updateName'>
        <label id="label" htmlFor="name-label"> End Date:</label>
        <input type="text" 
               id="input" 
               name="name-input"
               placeholder='dd/mm/yy'
               onChange={changeEndDate}
               value={endDate}>
        </input>
      </div>  
       
    </div>
  )
}

export default CreateTask
