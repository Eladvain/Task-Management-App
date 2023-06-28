import React, { useState } from 'react'
import newAcount from '../CSS/newAcount.css'
// import login from '../CSS/logIn.css'

const NewAcount = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    let response;
        event.preventDefault();

        const new_user = {
            "name": `${name}` ,
            "password": `${password}`
        }
        console.log("in handle submit");
        try {
            response = await fetch('http://localhost:2718/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_user)
            })
        } catch (e) {
            console.log("the error is:", e.name)
        }
             const parsed_response = await response.json();
             console.log(parsed_response["msg"]);
             console.log("move to login page");
        // const status = response.status;
        // console.log("parsed_response status------------", status);

        // if (status !== 200) {
        //     const parsed_response = await response.json();
        //     console.log("error");
        // }else
        // {
        //     console.log("move to login page");
        //     window.location.href = '/login.html' 
        // }
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
