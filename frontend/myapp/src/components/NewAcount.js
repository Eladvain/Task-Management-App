import React, { useState } from 'react'
import newAcount from '../CSS/newAcount.css'
// import login from '../CSS/logIn.css'

const NewAcount = () => {

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
  
  if(typeof list === 'undefined') return true; else return false;
  }

  

  const handleSubmit = async (event) => {
    let response;
        event.preventDefault();

        if(await checkIfInputValid())
        {
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
             alert(parsed_response["msg"]);
             console.log("move to login page");
             window.location.href = "/"
        
        }
        else{
          alert("name allready exist");
        }

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
