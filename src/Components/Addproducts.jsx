import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import Subscription from './Subscription';
import '../CSS/Addproducts.css';

const API = "https://vicmakau.alwaysdata.net/api";

const Addproducts = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState("");
  const [error, setError] = useState("");

  // Subscription state
  const [subStatus, setSubStatus] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [showSubModal, setShowSubModal] = useState(false);
  const [limitInfo, setLimitInfo] = useState(null);

  // ✅ useEffect is a function call — lives in the component body, NOT inside JSX
  useEffect(() => {
    if (!user?.user_id || user?.role !== "company") {
      setSubLoading(false);
      return;
    }
    axios.get(`${API}/subscription_status/${user.user_id}`)
      .then(r => setSubStatus(r.data))
      .catch(() => setSubStatus(null))
      .finally(() => setSubLoading(false));
  }, []);

  // ✅ Functions live in the component body too
  const checkLimitAndSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!subStatus?.has_active) {
      setShowSubModal(true);
      return;
    }

    try {
      const limitRes = await axios.get(`${API}/check_listing_limit/${user.user_id}`);
      if (!limitRes.data.allowed) {
        setLimitInfo(limitRes.data);
        return;
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setLimitInfo(err.response.data);
        return;
      }
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);
      formdata.append("user_id", user?.user_id);

      const response = await axios.post(`${API}/add_product`, formdata);
      setLoading(false);
      setsuccess(response.data.Message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setTimeout(() => setsuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // ✅ Limit wall — early return, lives before the main return
  if (limitInfo && !limitInfo.allowed) {
    const isTrial  = limitInfo.is_trial;
    const planName = limitInfo.plan
      ? limitInfo.plan.charAt(0).toUpperCase() + limitInfo.plan.slice(1)
      : "Trial";

    return (
      <div className="limit-wall">
        <div className="limit-card">
          <div className="limit-icon">🚫</div>
          <h3 className="limit-title">Listing Limit Reached</h3>
          <p className="limit-desc">
            Your <strong>{planName}</strong> plan allows up to{" "}
            <strong>{limitInfo.max}</strong> listings. You currently have{" "}
            <strong>{limitInfo.current}</strong>.
          </p>
          <p className="limit-sub">
            {isTrial
              ? "Your free trial is limited to 3 listings. Subscribe to a plan to add more."
              : "Upgrade your plan to add more properties."}
          </p>
          <button className="limit-upgrade-btn" onClick={() => setShowSubModal(true)}>
            🚀 Upgrade Subscription
          </button>
          <button className="limit-back-btn" onClick={() => setLimitInfo(null)}>
            ← Go Back
          </button>
        </div>

        {/* Subscription modal inside limit wall */}
        {showSubModal && user?.role === "company" && (
          <Subscription
            onClose={() => setShowSubModal(false)}
            onSubscribed={() => { setShowSubModal(false); setLimitInfo(null); }}
          />
        )}
      </div>
    );
  }

  // ✅ Main return — JSX blocks go INSIDE here
  return (
    <div className='row justify-content-center mt-2'>

      {/* 1. Subscription modal */}
      {showSubModal && user?.role === "company" && (
        <Subscription
          onClose={() => setShowSubModal(false)}
          onSubscribed={() => { setShowSubModal(false); window.location.reload(); }}
        />
      )}

      {/* 2. Active subscription status bar */}
      {user?.role === "company" && subStatus?.has_active && (
        <div className="sub-status-bar">
          {subStatus.is_trial
            ? `🕐 Free Trial: ${subStatus.days_left} day${subStatus.days_left !== 1 ? 's' : ''} remaining`
            : `✅ ${subStatus.plan_name?.charAt(0).toUpperCase() + subStatus.plan_name?.slice(1)} Plan — ${subStatus.days_left} days left`}
          <button className="sub-status-upgrade" onClick={() => setShowSubModal(true)}>
            {subStatus.is_trial ? "Subscribe Now" : "Manage Plan"}
          </button>
        </div>
      )}

      {/* 3. No subscription warning bar */}
      {user?.role === "company" && !subStatus?.has_active && !subLoading && (
        <div className="sub-required-bar">
          ⚠️ You need an active subscription to add listings.
          <button className="sub-status-upgrade" onClick={() => setShowSubModal(true)}>
            Get Started
          </button>
        </div>
      )}

      {/* 4. Existing content */}
      {loading && <Loader />}
      <h3 className="text-success">{success}</h3>
      <h4 className="text-danger">{error}</h4>

      <form onSubmit={checkLimitAndSubmit} className='form'>
        <p className="title">Add New Listing</p>

        <label>
          <input
            className="input"
            type="text"
            placeholder='Listing name'
            required
            value={product_name}
            onChange={e => setProductName(e.target.value)}
          />
        </label>

        <label>
          <input
            className="input"
            type="text"
            placeholder='Description'
            required
            value={product_description}
            onChange={e => setProductDescription(e.target.value)}
          />
        </label>

        <label>
          <input
            className="input"
            type="number"
            placeholder='Price (Ksh)'
            required
            value={product_cost}
            onChange={e => setProductCost(e.target.value)}
          />
        </label>

        <label className='text-primary'>Product photo</label>
        <input
          type="file"
          className='form-control input'
          required
          accept='image/*'
          onChange={e => setProductPhoto(e.target.files[0])}
        />
        <br />

        {user && (
          <p className="text-muted" style={{ fontSize: '13px' }}>
            Adding as: <strong>{user.username}</strong>
          </p>
        )}

        <input type="submit" value="Add Listing" className='btn btn-outline-primary' />
      </form>
    </div>
  );
};

export default Addproducts;
