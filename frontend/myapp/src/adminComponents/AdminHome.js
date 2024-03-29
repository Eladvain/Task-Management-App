import React, { useState, useEffect } from 'react'
import SortList from '../components/SortList'
import TaskItem from '../components/TaskItem'
import taskListCss from '../CSS/taskList.css'
import UsersList from './UsersList'

const AdminHome = () => {

  const [taskList, setTaskList] = useState([]);
  const [listByStatus, setListByStatus] = useState(false);
  const [interval, setIteval] = useState();

  
  async function updateTaskList(){
    let response;
    console.log("inside updateTaskList function -- in Admin");
    const user_id = localStorage.getItem("user_selected");
    console.log("user_id = "+user_id);
    try {
      response = await fetch(`http://localhost:2718/tasks/tasks/${user_id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
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

  }

  useEffect(()=>{
    // await getIdUser();
    // if(listByStatus === true){
    //  clearInterval(inter);
    // }
    // else{
    //   const inter = setInterval(() => {
    //     console.log('Interval triggered');
    //     updateTaskList();
    //   }, 1000);
    // }
    
    updateTaskList();
  },[,listByStatus])

  return (
    <div className='main-container'>
       <div className='task-list'>
        <h1 className='header-all-tasks'>All tasks list</h1>
        <SortList sortByStatus = {listByStatus} 
                  setSortedByStatus = {setListByStatus} 
                  taskOfList = {taskList}
                  setTaskList = {setTaskList}
                  updateTask = {updateTaskList}  />
        {taskList.map((task,key) =>{
          return <TaskItem taskItem = {task} buttonDel = {true} setByStatus = {setListByStatus} updateTask = {updateTaskList}/>
        })}
      </div>
      <UsersList updateTask = {updateTaskList}/>
    </div>
  )
}

export default AdminHome
