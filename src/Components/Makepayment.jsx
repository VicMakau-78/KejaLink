import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Makepayment = () => {
    // introduce the hooks
      const [product_name, setProductName] = useState("");
      const [product_cost, setProductCost] = useState("");

    // destructure the details passed from the Getproducts component
    // the useLocation hook allows us to get/destructure the properties passed from the previous component

    const {product} = useLocation().state || {}
    // console.log("The details passed from get prducts are:",product)

       // declare the navigate hook
    const navigate = useNavigate()

     // below we specify the image base url
  const img_url = "https://vicmakau.alwaysdata.net/static/images/"

    //   initialize hooks to manage the state of your application
      const [number, setNumber] = useState("")
      const [loading, setLoading] = useState([])
      const [success, setSuccess] = useState(false)
      const [error, setError] = useState("");

     //   create a function that will ahndle the submit action
        const handlesubmit = async (e) =>{
        // prevent the site from reloading 
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try{
            // create a form data object
            const formdata = new FormData()

            // append the data to the form data
           formdata.append("product_name", product_name);
           formdata.append("product_cost", product_cost);


            const response = await axios.post("https://vicmakau.alwaysdata.net/api/mpesa_payment", formdata)

            // set the success hook with a message
            setLoading(false)

            // update the success hook with the message
            setSuccess(response.data.message)
        
        }
        catch(error){
            // if there is an error respond to error
            setLoading(false)

            // update the error hook with a message
            setError(error.message)
        }
    }

  return (
    <div className="row justify-content-center">
        {/* <button className="btn btn-outline-primary">Back to Products</button> */}

        <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1>
        <div className="col-md-1">
            <input type="button" 
            value="back"
            className='btn btn-primary'
            onClick={() => navigate("/")} />
        </div>

        <div className="card shadow p-4 col-md-6">
            <img src= {img_url + product.product_photo} alt="Product Name" className='product_img' />
            <div className="card-body">
                <h2 className="text-info"> {product.product_name} </h2>
                <p className="text-dark"> {product.product_description} </p>
                <b className="text-warning">Ksh. {product.product_cost} </b> <br />

                <form onSubmit={handlesubmit}> 
                    <input type="tel"
                    className='form-control'
                    placeholder='Enter the Phone Number 254XXXXXXXXX' 
                    required /> <br />

                    <input type="submit"
                    value= "Make Payment"
                    className='btn btn-success' />
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default Makepayment