import React from 'react'

const SortList = ({sortByStatus, setSortedByStatus, taskOfList, setTaskOfList}) => {

    const [statusOption, setStatusOption] = ("");


  const changeBySort = async (event)=>{
    event.preventDefault();
    console.log("what selected = "+event.target.value)
    // setStatusOption(event.target.value);
    if(event.target.value === ""){
      console.log("in if optionnn");
      setSortedByStatus(false);
    }
    else if(event.target.value === "Status")
    {
      console.log("inside else if option");
      setSortedByStatus(true);
    }
    
  }

  const changeStatus = async (event)=>{
 
    console.log("in change status sortByStatus = "+sortByStatus);
    let response;
    if(event.target.value === "In Process"){
      try {
        response = await fetch("http://localhost:2718/tasks/byStatusInProcess", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.log('error = ' + error);
    }
    }
    else if(event.target.value === "Done"){
      console.log("in Done option");
      try {
        response = await fetch("http://localhost:2718/tasks/byStatusDone", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.log('error = ' + error);
    }
    }
    else{
      try {
        response = await fetch("http://localhost:2718/tasks/task", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.log('error = ' + error);
    }
    }
    
      const tasks_res = await response.json();
      const task_list = tasks_res["tasks"];
      console.log("task_list in sorted = "+JSON.stringify(task_list));
      setTaskOfList([...task_list]);
      console.log("sortByStatus = "+sortByStatus);
    event.preventDefault();
  }

  return (
    <div>
      <div className='sortBy'>
            <label id ='sort-label' htmlFor="sort-select">Choose by what to sort: </label>

            <select name="status_task" id="status-select" onChange={changeBySort}>
            <option value="">--according to the order of creation--</option>
            <option value="Status">By Status</option>
            {/* <option value="End of date">End Of Date</option> */}
            </select>
            {sortByStatus === true ?
            <div>
               <label id ='sort-label' htmlFor="sort-select">Choose status of task: </label>

               <select name="status_task" id="status-select" onChange={changeStatus} >
               <option value="">--Please choose an option--</option>
               <option value="In Process">In Process</option>
               <option value="Done">Done</option>
               </select>
               </div> : 
            ""}
            </div>
    </div>
  )
}

export default SortList
