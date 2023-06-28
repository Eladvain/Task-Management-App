import React, { useState } from 'react'
import newAcount from '../CSS/newAcount.css'
import { useLocation} from "react-router-dom";
// import login from '../CSS/logIn.css'

const NewAcount = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const location = useLocation();
  // const {checkFunc} = location.state;
  

  const handleSubmit = async (event) => {
    let response;
        event.preventDefault();

        // if(await this.props.location.state.checkFunc())
        // {
        //   const new_user = {
        //     "name": `${name}` ,
        //     "password": `${password}`
        //   }
        // console.log("in handle submit");
        // try {
        //     response = await fetch('http://localhost:2718/auth/signin', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(new_user)
        //     })
        // } catch (e) {
        //     console.log("the error is:", e.name)
        // }
        //      const parsed_response = await response.json();
        //      alert(parsed_response["msg"]);
        //      console.log("move to login page");
        //      window.location.href = "/"
        
        // }
        // else{
        //   alert("name allready exist");
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
                   value= "LogIn" /> 
          </div>
        </form>
      </div>
    </div>
  )

}
export default NewAcount
