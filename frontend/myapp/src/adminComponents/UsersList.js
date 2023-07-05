import React, { useEffect, useState } from 'react'

const UsersList = () => {

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

  return (
    <div className='users-list-div'>
      <h1> Users List</h1>
       {usersList.map((user)=>{
       return (user.name !== 'Admin') ?  <h1>{user.name}</h1> : ""
       })}

    </div>
  )
}

export default UsersList
