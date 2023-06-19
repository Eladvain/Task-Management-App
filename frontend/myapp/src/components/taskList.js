import React, { useState, useEffect } from 'react'
import TaskItem from './TaskItem';
import taskListCss from '../CSS/taskList.css'
import CreateTask from './CreateTask';
import SortList from './SortList';


const TaskList = () => {

  const [taskList, setTaskList] = useState([]);
  const [listByStatus, setListByStatus] = useState(false);

  // useEffect(()=>{
  //   console.log("in useEffect of list by statusss!!!!");
  //   console.log("innn-->>>"+listByStatus);
  // }, [listByStatus])

  async function updateTaskList(){
    let response;
    // console.log("inside");
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
  const tasks_res = await response.json();
  const task_list = tasks_res["tasks"];
  console.log("task_list in useEffect = "+JSON.stringify(task_list));
  setTaskList([...task_list]);
  // console.log("books = "+books)
  // await printBooksToConsole(books);
  }


  useEffect(() => {

    async function doIfIsTrue()
  {
    
    console.log("listByStatus-->"+listByStatus )

    console.log("in useEffect of list by status");
    let timer;
    if(listByStatus === true){
      console.log("in clear interval");
      clearTimeout(timer);
    }
    else if(listByStatus === false)
    {
         timer = setTimeout(async ()=>{
          await updateTaskList(); 
          console.log("in useEffect --> listByStatus = "+listByStatus)
        
         },1000)
    }
}
      
   doIfIsTrue();
    
  },[listByStatus]);



  return (
    <div className='main-container'>
      <div className='task-list'>
        <h1 className='header-all-tasks'>All tasks list</h1>
        <SortList sortByStatus = {listByStatus} 
                  setSortedByStatus = {setListByStatus} 
                  taskOfList = {taskList}
                  setTaskOfList = {setTaskList}  />
        {taskList.map((task,key) =>{
          return <TaskItem taskItem = {task} buttonDel = {true}/>
        })}
      </div>
      <CreateTask setByStatus = {setListByStatus}/>
    </div>
        
      
    
  )
  }

export default TaskList
