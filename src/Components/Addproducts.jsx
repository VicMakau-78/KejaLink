import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css'

const user = JSON.parse(localStorage.getItem("user"));


const Addproducts = () => {
  // introduce the hooks
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
//   const [preview, setPreview] = useState("");

  // declare the three additional hooks to manage the state of the application
  const [loading,setLoading] = useState(false);
  const [success, setsuccess] = useState("");
  const [error, setError] = useState("");

  // create a function that will ahandle the submit action
  const handleSubmit = async(e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // set loading hook with a message
    setLoading(true)

    try{
      // create a form data
      const formdata = new FormData()

      // append the details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);
      formdata.append("user_id", user?.id);
      formdata.append("user_id", user?.id);
      formdata.append("company_name", user?.name);   // 🔥 ADD THIS

      // interact with axios to hep you use the method post
      const response = await axios.post("https://vicmakau.alwaysdata.net/api/add_product", formdata)

      // set the loading hook back to default
    setLoading(false)
    
    // update the success hook with a message
    setsuccess(response.data.message)

    // clearing the hooks (setting them back to default)
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductPhoto("");

    e.target.reset()

    setTimeout(()=> {
      setsuccess("");
    },5000);
    }

    
    catch(error){
      // set loading hook back to default
      setLoading(false)

      // update the setError with a messaage
      setError(error.message)

    }
  }

  return (
    <div className='row justify-content-center mt-2'>

        {/* bind the loading hook */}
        {loading && <Loader />}
        <h3 className="text-success"> {success} </h3>
        <h4 className="text-danger"> {error} </h4>

       
        <form onSubmit={handleSubmit} className='form'>
            <p className="title">Welcome to Add Listings </p>
        <label> 
          <input className="input"
          type="text" 
          placeholder='Enter the Listing name'            
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}/> <br />

        </label> 

          {/* {product_name} */}

          <label>
            <input className="input"
            type="text"
          placeholder='Enter the listing description'           
          required
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}/> <br />

          </label>

          {/* {product_description} */}

          <label htmlFor="">
            <input className="input"
            type="number"
          placeholder='Enter the price of the listing'           
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}/> <br />

          </label>

          {/* {product_cost} */}

          {/* <!-- From Uiverse.io by Yaya12085 --> 

            <label className="custum-file-upload" for="file">            
            <div className="text">
            <span>Click to upload image</span>
            </div>
            <input type="file" id="file" accept='image/*' required
            onChange={(e) =>setProductPhoto(e.target.files[0])} />
            </label>
            Image preview display
            {preview && (
            <div className="preview-container">
                <img 
                src={preview} 
                alt="Product Preview" 
                style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} 
                />
            </div>
            )}
             <br /> */}


          <label className='text-primary'>Product photo</label>
          <input type="file"
          className='form-control input'
          required
          accept='image/*'
          onChange={(e) =>setProductPhoto(e.target.files[0])}
           /> <br />

          <input type="submit"
          value="Add Listing"
          className='btn btn-outline-primary' />
        </form>
      </div>
        

  )
}

export default Addproducts;