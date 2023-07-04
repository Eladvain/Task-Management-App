import React, { useState } from 'react'
import logIn from '../CSS/logIn.css'
import { Link, Outlet } from 'react-router-dom'

const LogIn = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function checkIfInputValid()
  {
      let response;
    console.log("inside check");
      try {
      response = await fetch('http://localhost:2718/auth/usersName', {
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
  const users_res = await response.json();
  const users_list = users_res["users"];
  console.log("users_name_list = "+JSON.stringify(users_list));
  
  let list = await users_list.find((user)=> name === user.name);
  console.log(JSON.stringify(list));
  
  if(typeof list === 'undefined') return true; else return false;
  }


  const handleSubmit = async (event) => {
    let response;
    event.preventDefault();
    if(! await checkIfInputValid())  //--- name is exist in database ---
    {
      const user = {
        "name" : `${name}`,
        "password":`${password}`
      }
      let response;
      console.log("inside check");
        try {
        response = await fetch('http://localhost:2718/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body : JSON.stringify(user)
        });
        const parsed_response = await response.json();
        localStorage.setItem("user_name", user.name);
        console.log(response.headers);
             alert(parsed_response["msg"]);
             console.log("move to home page");
             window.location.href = "/home"
    } catch (error) {
        console.log('error = ' + error);
    }
    }
    else{
      alert("User doesn't exist");
    }
  }

  return (
    <div className='log-in-container'>
      <div className='wrap-log-in'>
        <div className='log-in-pic'>
          <img className='img-login' src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="png" />
        </div>
        <form className='form-log-in' onSubmit={handleSubmit}>
          <div className='div-form'>
          <span className='span-loging'>Member Login</span>
          <div className='name-input-div'>
            {/* <span className='name-span'>Name : </span> */}
            <input className='name-input'
                   type="text"
                   placeholder='Name'
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>

          </div>
          <div className='password-input-div'>
            {/* <span className='name-span'>Password : </span> */}
            <input className='password-input'
                   type="text"
                   placeholder='Password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>

          </div>
          <div className='button-input-div'>
            <input className='button-login' 
                   type="submit"
                   value= "LogIn" /> 
          </div>
          <div className='newAccount-input-div'>
            <Link to = "/newAcount" state={{ }}>Don't have an account yet?</Link>
            <Outlet/>
          </div>
          </div>
        </form>
        
          
        
      </div>
      
    </div>
  )
}

export default LogIn
