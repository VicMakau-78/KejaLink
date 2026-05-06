import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css'

const Addproducts = () => {
  // ✅ Move inside component so it reads fresh from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formdata = new FormData()
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);
      formdata.append("user_id", user?.user_id);  // ✅ Fix: user_id not id, no duplicate

      const response = await axios.post(
        "https://vicmakau.alwaysdata.net/api/add_product",
        formdata
      )

      setLoading(false)
      setsuccess(response.data.Message)  // ✅ Fix: backend returns "Message" not "message"

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      e.target.reset()

      setTimeout(() => setsuccess(""), 5000);

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center mt-2'>

      {loading && <Loader />}
      <h3 className="text-success">{success}</h3>
      <h4 className="text-danger">{error}</h4>

      <form onSubmit={handleSubmit} className='form'>
        <p className="title">Welcome to Add Listings</p>

        <label>
          <input className="input"
            type="text"
            placeholder='Enter the Listing name'
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)} />
        </label>

        <label>
          <input className="input"
            type="text"
            placeholder='Enter the listing description'
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)} />
        </label>

        <label>
          <input className="input"
            type="number"
            placeholder='Enter the price of the listing'
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)} />
        </label>

        <label className='text-primary'>Product photo</label>
        <input type="file"
          className='form-control input'
          required
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])} />
        <br />

        {/* Show who is adding the listing */}
        {user && (
          <p className="text-muted" style={{ fontSize: '13px' }}>
            Adding as: <strong>{user.username}</strong> (ID: {user.user_id})
          </p>
        )}

        <input type="submit"
          value="Add Listing"
          className='btn btn-outline-primary' />
      </form>
    </div>
  )
}

export default Addproducts;