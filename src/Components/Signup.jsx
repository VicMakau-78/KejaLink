import axios from 'axios';
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../css/Signup.css'


const Signup = () => {
  // initialize the hooks
  const [username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[phone, setPhone] = useState("");

  // Define the three states an application will move to
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Below is a function that will handle the submit action
  const handleSubmit = async(e) =>{
    // Below we prevent our site from reloading
    e.preventDefault()

    // Update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as we sign you up....")

    try{
      // create a form data object that will enable you to capture the four details entered on the form.
      const formdata = new FormData();

      // Insert the four details in terms(username, email, password and phone) of key - value pairs.
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

     // By use of axios,  we can access the method post
     const response = await axios.post("https://vicmakau.alwaysdata.net/api/signup", formdata)

     // Set back the loading to default
     setLoading("");

     // Just incase everything goes on well update the success Hook with a message
     setSuccess(response.data.message) 

     // Clear your Hooks
     setUsername("")
     setEmail("")
     setPassword("")
     setPhone("")
    }

    catch(error){
      // Set the loading hook back to default
      setLoading("")

      // Update the error hook with the message given back from the response
      setError(error.message)
    }  
  }

  return (
    <div className='row justify-content-center mt-5'>
        
          <h5 className="text-warning mb-0"> {loading} </h5>
          <h3 className="text-success mb-0"> {success} </h3>
          <h4 className="text-danger mb-0"> {error} </h4>

          <p class="message">Signup now and get full access to our app. </p>

          {/* Input Form */}

          <form onSubmit={handleSubmit} className='form'>            
            <p class="title">Register </p>            
              
              <label>
                <input class="input"
                 type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                   required=""/>
                <span>Username</span>
              </label>

              <label>
                 <input class="input" 
                    type="email" 
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required=""/>

                   <span>Email</span>
              </label> 
        
                <label>
                <input class="input" 
                  type="password" 
                  placeholder="Password"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}/>

                  <span>Password</span>
              </label>

              <label>
                <input class="input" 
                  type="Phone Number" 
                  placeholder="Phone Number"
                  required=""
                  onChange={(e) => setPhone(e.target.value)}/>

                  <span>Phone</span>
              </label>
              
           <input type="submit" value="Sign Up" className='btn btn-primary' /><br />

            Already have an account? <Link to={"/signin"}>Sign in</Link>
          </form>
        </div>  
  )
}

export default Signup

// Research on Axios modules in reactJS