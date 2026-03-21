import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  // initialize hook to help you manage the state of your application
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  // declare the navigate hook
  const navigate = useNavigate()

  // below we specify the image base url
  const img_url = "https://vicmakau.alwaysdata.net/static/images/"

  // create a function that will help you fetch the products from your API
  const fetchproducts = async () =>{
    try{
      // update the loading hook
      setLoading(true)

       // Interact with your endpoint for fetching the endpoint
      const response = await axios.get("https://vicmakau.alwaysdata.net/api/get_product_details")

      // Update the products hook with the response given from the API
      setProducts(response.data)

      // set the loading hook back to default
      setLoading(false)
    }
    catch(error){
      //if there is an error
      // set the loading hook back to default
      setLoading(false)

      // update the error hook with a message
      setError(error.message)
     
    }
  }

  // We shall use the useEffect hook. This hook enables us to automatically re-render new features incase of any changes
  useEffect(() => {
    fetchproducts()
  },[])

  // console.log(products)


  return (
    <div className='row'>
      <h3 className="text-primary">Available products</h3>

        {loading && <Loader/>}
        <h4 className="text-danger"> {error} </h4>

        {/* map the products fetched from the API to the user interface  */}

        {products.map((product) => (
          <div className="col-md-3 justify-content-center mb-3">
          <div className="card shadow">
            <img
             src= {img_url + product.product_photo}
             alt="product name"
             className='product_img mt-3'  />

            <div className="card-body">

              <h5 className="text-primary"> {product.product_name} </h5>

              <p className="text-dark"> {product.product_description.slice(0, 70)}... </p>

              <h4 className="text-success">Ksh. {product.product_cost} </h4>

              <button className="btn btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
            </div>
          </div>
        </div>
        ) )}
        
    </div>
  )
}

export default Getproducts;