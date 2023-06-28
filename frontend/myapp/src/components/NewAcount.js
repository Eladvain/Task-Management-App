import React, { useState } from 'react'
import newAcount from '../CSS/newAcount.css'
// import login from '../CSS/logIn.css'

const NewAcount = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div className='div-container'>
      <div className='newAcount-div'>
        <form className='newAcount-form' onSubmit={handleSubmit}>
            <span className='newAcount-span'>New Member SignIn</span>
            <div className='new-name-div'>
            <input className='new-name-input'
                   type="text"
                   placeholder='Name'
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>

          </div>
          <div className='new-password-div'>
            <input className='new-name-input'
                   type="text"
                   placeholder='Password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>

          </div>
          <div className='button-signin-div'>
            <input className='button-signin' 
                   type="submit"
                   value= "SignIn" /> 
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewAcount
