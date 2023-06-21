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

  useEffect(()=>{
    updateTaskList();
  },[])

//   useEffect(() => {
   
//     console.log("in useEffect of listByStatus = "+listByStatus);
//     if(listByStatus === false){
//       updateTaskList();
//     }
    
  
// },[setListByStatus]);


  // useEffect(async () => {
  //  console.log("in useEffect of setTaskList");
  //    await updateTaskList();
    
  // },[setTaskList]);

  async function doIfIsTrue()
  {
    await updateTaskList();
    // if(listByStatus === false)
    // {
    //   timer = setInterval(async ()=>{
    //   updateTaskList(); 
    //   console.log("in useEffect --> listByStatus = "+listByStatus);
    //   // clearInterval(timer);
    //   // if(listByStatus === true){
    //   //   clearInterval(timer);
    //   // }
    //   },1000)
      
    // }
    // else if(listByStatus === true){
    //   console.log("in else if listByStatus = true");
    //   clearInterval(timer);
    // }
    
    
  }


  return (
    <div className='main-container'>
      <div className='task-list'>
        <h1 className='header-all-tasks'>All tasks list</h1>
        <SortList sortByStatus = {listByStatus} 
                  setSortedByStatus = {setListByStatus} 
                  taskOfList = {taskList}
                  setTaskList = {setTaskList}  />
        {taskList.map((task,key) =>{
          return <TaskItem taskItem = {task} buttonDel = {true} setByStatus = {setListByStatus} updateTask = {updateTaskList}/>
        })}
      </div>
      <CreateTask updateTask = {updateTaskList}/>
    </div>
        
      
    
  )
  }

export default TaskList
