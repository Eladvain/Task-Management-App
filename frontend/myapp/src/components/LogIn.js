import React from 'react'
import logIn from '../CSS/logIn.css'

const LogIn = () => {
  return (
    <div className='log-in-container'>
      <div className='wrap-log-in'>
        <div className='log-in-pic'>
          <img className='img-login' src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="png" />
        </div>
        <form className='form-log-in'>
          <div className='div-form'>
          <span className='span-loging'>Member Login</span>
          <div className='name-input-div'>
            {/* <span className='name-span'>Name : </span> */}
            <input className='name-input'
                   type="text"
                   placeholder='Name'/>

          </div>
          <div className='password-input-div'>
            {/* <span className='name-span'>Password : </span> */}
            <input className='password-input'
                   type="text"
                   placeholder='Password'/>

          </div>
          </div>
        </form>
        
          
        
      </div>
      
    </div>
  )
}

export default LogIn
