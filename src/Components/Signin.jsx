import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  // define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Below we have the useNavigate hookto redirect us to another page on successful login.
  const navigate = useNavigate("");

  // Below is the function to handle the sign in action
  const handlesubmit = async(e) => {
    // Prevent the site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait as we authenticate your account")

    try{
      // Create a formData object that will hold the emial and the password
      const formdata = new FormData()

      // Insert/append the email and password on the formdata created
      formdata.append("email", email);
      formdata.append("password", password);

      // interact with axios for the response
      const response = await axios.post("https://vicmakau.alwaysdata.net/api/signin", formdata);

      // set loading hook back to default
      setLoading("");

      // check whether the user exists as part of your response from the API
      if(response.data.user){
        // if user is there, definitely the details entered during signin are correct
        // setSuccess('Log in Successful')

        // Store user details in local storage

         localStorage.setItem("user", JSON.stringify(response.data.user));

        // If it is successful, let the user get redirected to another page
        navigate ("/");
      }
      else{
        // user is not found, that means the credential enterd on the form are incorrect
        setError("Log in Failed. Please Try Again...")
      }
    }

    catch(error){
      // set loading back to default
      setLoading("")

      // update the error hook with  message
      setError("Oops, Something went wrong. Try again...")
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className='text-primary'>Sign in</h1>
        <h5 className="text-info"> {loading} </h5>
        <h3 className="text-success"> {success} </h3>
        <h4 className="text-danger"> {error} </h4>

        <form onSubmit={handlesubmit}>
          <input type="email"
          placeholder='Enter Email address..'
          className='form-control'
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/> <br />

          {/* {email} */}

          <input type="password"
          placeholder='Enter password'
          className='form-control'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}/> <br />

          {/* {password} <br /> */}

          <input type="submit" 
          value="Sign in"
          className='btn btn-primary' /> <br />

          Don't have an account? <Link to={"/signup"}>Register</Link>
        </form>

      </div>
    </div>
  )
}

export default Signin

// how can you store the users details on the local storage