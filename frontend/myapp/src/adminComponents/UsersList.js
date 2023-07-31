import React, { useEffect, useState } from 'react'
import UserItem from './UserItem';
import usersList from '../CSS/usersList.css';

const UsersList = ({updateTask}) => {

  const [usersList, setUsersList] = useState([]);

  async function getUsers()
  {
    let response;
    // const user_id = localStorage.getItem("user_id");
    // console.log("user_id = "+user_id);
    try {
      response = await fetch(`http://localhost:2718/auth/usersName`, {
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
  const users_res = await response.json();
  const users_list = users_res["users"];
  console.log("users_list in useEffect = "+JSON.stringify(users_list));
  setUsersList([...users_list]);

  }

  useEffect(()=>{
     getUsers();
  }, [])

  const userSelect = async (event)=>{
    event.preventDefault();
    console.log("what selected = "+event.target.value);
    if(event.target.value === ""){
      localStorage.setItem("user_selected", 6);
    }
    else{
      localStorage.setItem("user_selected", event.target.value);
    }
    
    updateTask();
  }

  return (
    <div className='users-list-div'>
      <h1 className='users-list-headline'> Users List</h1>
      <select name="user" id="user-select" onChange={userSelect} >
      <option value="">--Please choose user--</option>
      {usersList.map((user)=>{
       return (user.name !== 'Admin') ?  <option value={user.id}>{user.name}</option> : ""
       })}
               
               </select>
       

    </div>
  )
}

export default UsersList
