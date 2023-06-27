import React from 'react'
import newAcount from '../CSS/newAcount.css'
// import login from '../CSS/logIn.css'

const NewAcount = () => {
  return (
    <div className='div-container'>
      <div className='newAcount-div'>
        <form className='newAcount-form'>
            <span className='newAcount-span'>New Member SignIn</span>
            <div className='new-name-div'>
            <input className='new-name-input'
                   type="text"
                   placeholder='Name'/>

          </div>
          <div className='new-password-div'>
            <input className='new-name-input'
                   type="text"
                   placeholder='Password'/>

          </div>
          <div className='button-signin-div'>
            <button className='button-signin'>SignIn</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewAcount
