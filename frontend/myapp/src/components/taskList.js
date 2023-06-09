import React, { useState, useEffect } from 'react'
import TaskItem from './TaskItem';


const TaskList = () => {

  const [taskList, setTaskList] = useState([]);

  // useEffect(()=>{
  //   console.log("shopping cart books = "+JSON.stringify(shoppingCartBooks));
  // }, [shoppingCartBooks])

  useEffect(() => {
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
    
    updateTaskList();
  },[]);


  return (
    <div>
      {taskList.map((task,key) =>{
        return <TaskItem taskItem = {task}/>
      })}
    </div>
  )
  }

export default TaskList
