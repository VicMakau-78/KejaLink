import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'


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
    <div className="container py-4">
      <h3 className="text-center fw-bold mb-4 text-primary">✨ Available Products</h3>

      {loading && <Loader />}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card h-100 border-0 shadow-sm">

              <div className="image-wrapper">
                <img
                  src={img_url + product.product_photo}
                  alt="product"
                  className="card-img-top product_img"
                />
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="fw-semibold text-dark">
                  {product.product_name}
                  <span className="badge bg-danger ms-2">New</span>
                </h5>

                <p className="text-muted small flex-grow-1">
                  {product.product_description?.slice(0, 70)}...
                </p>

                <h4 className="text-success fw-bold mb-3">
                  Ksh. {product.product_cost}
                </h4>

                <button
                  className="btn btn-modern mt-auto"
                  onClick={() => navigate("/makepayment", { state: { product } })}
                >
                  🛒 Purchase Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproducts;