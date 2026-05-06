import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signin.css'

const Signin = () => {

  // define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // reading user later
  const user = JSON.parse(localStorage.getItem("user"));

  // Below we have the useNavigate hookto redirect us to another page on successful login.
  const navigate = useNavigate("");

  // Below is the function to handle the sign in action
const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Please wait as we authenticate your account...")
    setError("");

    try {
      const formdata = new FormData()
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post("https://vicmakau.alwaysdata.net/api/signin", formdata);
      setLoading("");

      if (response.data && response.data.user) {
        // ✅ Save to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Tell Navbar instantly — no refresh needed
        window.dispatchEvent(new Event("userLoggedIn"));

        setSuccess("Login successful! Redirecting...");

        // Redirect based on role
        setTimeout(() => {
          if (response.data.user.role === "company") {
            navigate("/company-dashboard");
          } else {
            navigate("/");
          }
        }, 800);

      } else {
        setError("Login failed. Please check your email and password.");
      }

    } catch (error) {
      setLoading("");
      setError("Oops, something went wrong. Try again...");
    }
  }


  return (
    <div className='row justify-content-center mt-4'>
        <h5 className="text-info"> {loading} </h5>
        <h3 className="text-success"> {success} </h3>
        <h4 className="text-danger"> {error} </h4>
        
                  {/* Input Form */}
        
                  <form onSubmit={handlesubmit} className='form'>            
                    <p className="title">Sign In </p>            
                             
                      <label>
                         <input className="input" 
                            type="email" 
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required=""/>
        
                           <span>Email</span>
                      </label> 
                
                        <label>
                        <input className="input" 
                          type="password" 
                          placeholder="Password"
                          value={password}
                          required=""
                          onChange={(e) => setPassword(e.target.value)}/>
        
                          <span>Password</span>
                      </label>
                      
                   <input type="submit" value="Sign In" className='btn btn-primary' /><br />
        
                    Don't have an account? <Link to={"/signup"}>Register</Link>
                  </form>
      </div>
  )
}

export default Signin

// how can you store the users details on the local storage