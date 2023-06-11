import React, { useState } from 'react'


const EditTask = () => {

  const [statusChecked, setStatusChecked] = useState(false);

  const handleChange = async () => {
    console.log(statusChecked);
    setStatusChecked(!statusChecked);
    console.log(statusChecked);

    if(statusChecked === true){
      console.log("in update task");
    }
  };

  // async function updateTask() {
    
  //   console.log("checkBox = "+checkBox)
  //   // console.log("in update task");
  //   if (checkBox.checked){
  //     console.log("in update task");
  //     const sel = document.createElement("select");
  //     const opt1 = document.createElement("option");
  //     const opt2 = document.createElement("option");

  //     opt1.value = "in process";
  //     opt1.text = "Option: in process";

  //     opt2.value = "done";
  //     opt2.text = "Option: done";

  //     sel.add(opt1, null);
  //     sel.add(opt2, null);

  //     document.getElementById("appendToUpdate").appendChild(sel);
  //   } 
  // }

  return (
    <div>
      <h1 className='choose-update'>choose which field to update</h1>
      <label htmlFor='status'>Status:</label> 
      <input type="checkbox"
             id="status" 
             checked={statusChecked}
             onChange={handleChange}>
       </input>
      <div className='appendToUpdate'></div>
    </div>
  )
}

export default EditTask
