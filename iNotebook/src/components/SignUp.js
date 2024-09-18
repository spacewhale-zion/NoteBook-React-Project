import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",confirmPassword:""});
  const navigate=useNavigate();


   const handleSubmit =async (e)=>{
    if(credentials.password!==credentials.confirmPassword){
      props.showAlert("Your Password does not match confirm password","danger")
     
    }
   
    else{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}), 
   
        });
        const json=await response.json();
       console.log(json) ;
       localStorage.setItem("token",json.authToken);
       navigate("/");
      props.showAlert("Your Account was Created Succesfully","success")

    }

   }
   const onChange=(e)=>{
       setCredentials({...credentials,[e.target.name]: e.target.value})
   }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="email" className="form-label">Name</label>
    <input required type="text" className="form-control" name="name" minLength={5}value= {credentials.name}onChange={onChange} id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input required type="email" className="form-control" minLength={5} name="email"value= {credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input required type="password" className="form-control"name="password" minLength={5} value= {credentials.password}onChange={onChange}  id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input required type="password" className="form-control" minLength={5} name="confirmPassword" value= {credentials.confirmPassword}onChange={onChange} id="confirmPassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp
