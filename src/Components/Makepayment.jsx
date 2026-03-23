import axios from 'axios';

import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Loader from './Loader';


const Makepayment = () => {


 // Destructure the product details passed from the Getproduct component

 // useLocation hook allows us to get/destructure the properties passed from previous component.

 const { product } = useLocation().state || {};


 // Declare the navigate hook

 const navigate = useNavigate();


 // console.log("The details of the product are:", product);


 // below we specify the image base URL

const img_url = "https://vicmakau.alwaysdata.net/static/images/";


 // initialize hooks to manage the state of your application

 const [number, setNumber] = useState("");

 const [loading, setLoading] = useState(false);

 const [error, setError] = useState("");

 const [success, setSuccess] = useState("");


 // create a function that will handle the submit action

 const handlesubmit = async (e) => {

 // prevent site from reloading

e.preventDefault();


 // update the loading hook

 setLoading(true);

 try{

 // create a form data object

 const formData = new FormData();


 // append the details to the form data created above

 formData.append("phone", number);

formData.append("amount", product.product_cost);


 const response = await axios.post("https://vicmakau.alwaysdata.net/api/mpesa_payment", formData);


 // set loading hook back to default

 setLoading(false);


 // update the success hook with the message from the API

 setSuccess(response.data.Message);
}

catch(error) {

// if there is an error respond to the error

 setLoading(false);


 // update the error hook with the error message

 setError(error.message);


}

}

 return (

<div className='row justify-content-center'>

 {/* <button className="btn btn-outline-primary">Back to Product</button> */}

 <h1 className='text-success'>Make Payment - Lipa Na M-Pesa</h1>


 <div className="col-md-1">

 <input type="button"

className="btn btn-primary"

 value="<-Back" 

 onClick={() => navigate("/")}/>


 </div>


 <div className="col-md-6 card shadow p-4">

 <img src={img_url + product.product_photo} alt="Product name" className='product_img' />


<div className="card-body">

 <h2 className="text-info">{product.product_name}</h2>


 <p className="text-dark">{product.product_description}</p>


 <h3 className="text-warning">Kes {product.product_cost}</h3>


 <form onSubmit={handlesubmit}>


 {/* bind the loading hook */}


 {loading && <Loader />}


<h3 className="text-success"> {success} </h3>

 <h4 className="text-danger"> {error} </h4>


 <input 

 type="number"

className='form-control'

 placeholder='Enter the Phone number 254xxxxxxxx' 

 required

 value={number}

 onChange={(e) => setNumber(e.target.value)}

/> <br />


<input type="submit" 

value="Make Payment" className="btn btn-success" />

 </form>

 </div>

</div>

 </div>

 )

}


export default Makepayment;