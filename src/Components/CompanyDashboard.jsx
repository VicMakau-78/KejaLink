import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/CompanyDashboard.css'

const CompanyDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const img_url = "https://vicmakau.alwaysdata.net/static/images/";

  const fetchMyProperties = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://vicmakau.alwaysdata.net/api/get_product_details`
      );

      // Filter only this company's properties
      const myProps = response.data.filter(
        (item) => item.user_id == user?.id
      );

      setProperties(myProps);
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="mb-3">🏢 Company Dashboard</h2>

      <p className="text-muted">
        Welcome, <strong>{user?.username}</strong>
      </p>

      {/* Add Property Button */}
      <Link to="/addproducts" className="btn btn-success mb-4">
        + Add New Property
      </Link>

      {/* Properties List */}
      <div className="row">

        {loading && <p>Loading...</p>}

        {properties.length === 0 && (
          <p>No properties yet.</p>
        )}

        {properties.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">

              <img
                src={img_url + item.product_photo}
                alt=""
                className="card-img-top product_img"
              />

              <div className="card-body">
                <h5>{item.product_name}</h5>
                <p>{item.product_description}</p>
                <h6 className="text-success">
                  Ksh {item.product_cost}
                </h6>

                {/* Future buttons */}
                <button className="btn btn-warning btn-sm me-2">
                  Edit
                </button>

                <button className="btn btn-danger btn-sm">
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default CompanyDashboard;