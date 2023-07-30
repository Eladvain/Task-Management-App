import React from 'react'

const UserItem = ({useritem}) => {

  const userSelect = async (event)=>{
  }

  return (
    <div className='user-div'>
      <select name="user" id="user-select" onChange={userSelect} >
               <option value="">--Please choose user--</option>
               <option value='user'>{useritem.name}</option>
               </select>
    </div>
  )
}

export default UserItem
