import React, { useState } from 'react'
import createTask from '../CSS/createTask.css'

const CreateTask = ({updateTask}) => {

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

  async function checkIfInputCorrect()
  {
    let msg_input_not_correct = [];

    if(endDate.length > 0)
    {
      console.log("inside")
      let letter;
      for(let i = 0; i < endDate.length; i++)
      {
        letter = endDate[i];
        if((letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z')){
          msg_input_not_correct.push("Date cannot consist of letters. Only numbers and / sign.")
          return msg_input_not_correct;
        }
      }

      const date = new Date();
      let year = date.getFullYear();
      let yearInString = year.toString();
      // console.log("type = "+typeof year);

      let splitEndDate = [];
      splitEndDate = endDate.split('/');
      if(splitEndDate.length === 3)
      {
        let yearWithoutPre = yearInString[2] + yearInString[3];
        if(splitEndDate[2] < yearWithoutPre){
          msg_input_not_correct.push(`year must be at least ${yearWithoutPre} - ${yearInString}`)
        }
      }
      else{
        msg_input_not_correct.push("Date format is incorrect");
      }

      return msg_input_not_correct;
    }
      
  }


  async function createTaskInBackend()
  {
    let checkList = [];
    checkList = await checkIfInputCorrect();
    if(checkList.length > 0)
    {
      alert(checkList[0]);
      return;
    }
    console.log("in button click");
    if(name === "" || endDate === ""){
      alert("input is not valid");
      return;
    }
    let response;
    let taskObject = {
      "name" : `${name}`,
      "endDate" : `${endDate}`,
      "description" : `${description}`
    }

    console.log("task = "+JSON.stringify(taskObject))
        try {
            response = await fetch('http://localhost:2718/tasks/task', {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(taskObject)
            });
        } catch (error){
            console.log('error');
        }
        console.log("after fetch");
        const parsed_response = await response.json();
        console.log(parsed_response["msg"]);
        alert("task inserted");
        await updateTask();
        // setByStatus(false);
  }
  

  return (
    <div className='create-task-div'>
      <h1 className='header-create-task'>Create Task</h1>
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
      <div className='div-button'>
        <button className='create-task-button' onClick={createTaskInBackend}>Create</button>
      </div>
       
    </div>
  )
}

export default CreateTask
