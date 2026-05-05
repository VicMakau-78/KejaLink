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

 const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [visitDate, setVisitDate] = useState("");
const [visitTime, setVisitTime] = useState("");


 // create a function that will handle the submit action

 const handlesubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    // 1️⃣ SAVE BOOKING FIRST
    const bookingData = new FormData();

    bookingData.append("product_id", product.product_id);
    bookingData.append("first_name", firstName);
    bookingData.append("last_name", lastName);
    bookingData.append("email", email);
    bookingData.append("phone", number);
    bookingData.append("visit_date", visitDate);
    bookingData.append("visit_time", visitTime);

    await axios.post(
      "https://vicmakau.alwaysdata.net/api/book_visit",
      bookingData
    );

    // 2️⃣ THEN MPESA PAYMENT
    const paymentData = new FormData();
    paymentData.append("phone", number);
    paymentData.append("amount", product.product_cost);

    const response = await axios.post(
      "https://kbenkamotho.alwaysdata.net/api/mpesa_payment",
      paymentData
    );

    setSuccess("Booking saved & payment initiated!");
    setLoading(false);

  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};

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
  type="text"
  className="form-control"
  placeholder="First Name"
  required
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
/><br/>

<input
  type="text"
  className="form-control"
  placeholder="Last Name"
  required
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
/><br/>

<input
  type="email"
  className="form-control"
  placeholder="Email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/><br/>

<input
  type="date"
  className="form-control"
  required
  value={visitDate}
  onChange={(e) => setVisitDate(e.target.value)}
/><br/>

<input
  type="time"
  className="form-control"
  required
  value={visitTime}
  onChange={(e) => setVisitTime(e.target.value)}
/><br/>
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