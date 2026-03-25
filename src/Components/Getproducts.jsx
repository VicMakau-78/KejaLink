import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'

const Getproducts = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const img_url = "https://vicmakau.alwaysdata.net/static/images/"

  const submitRating = async (productId, rating) => {
    try {
      const res = await axios.post("https://vicmakau.alwaysdata.net/api/add_rating", {
        product_id: productId,
        rating,
      })

      // Optional: update product avg_rating locally after successful submission.
      if (res.status === 201) {
        setProducts((prev) =>
          prev.map((p) =>
            p.product_id === productId
              ? { ...p, avg_rating: ((p.avg_rating || 0) + rating) / 2 }
              : p
          )
       )
      }
    } catch (err) {
      console.error("Rating submit error", err)
      setError(err.response?.data?.error || err.message || "Rating failed")
    }
  }

  const fetchproducts = useCallback(async () => {
    try {
      setLoading(true)

      const response = await axios.get("https://vicmakau.alwaysdata.net/api/get_product_details")
      const allProducts = Array.isArray(response.data) ? response.data : []
      const companyProducts = allProducts.filter((p) => p.company_name)
      setProducts(companyProducts.length ? companyProducts : allProducts)
      setError("")
    } catch (error) {
      setError(error.response?.data?.error || error.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchproducts()
  }, [fetchproducts])

  return (
    <div className="container py-4">
      <h3 className="text-center fw-bold mb-4 text-primary">✨ Available Products</h3>

      {loading && <Loader />}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.product_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card h-100 border-0 shadow-sm">

              {/* IMAGE */}
              <div className="image-wrapper">
                <img
                  src={img_url + product.product_photo}
                  alt="product"
                  className="card-img-top product_img"
                />
              </div>

              {/* BODY */}
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
                <div className="mb-2">

  {[1,2,3,4,5].map((star) => (
    <span
      key={star}
      style={{
        cursor: "pointer",
        color: star <= Math.round(product.avg_rating || 0) ? "gold" : "gray",
        fontSize: "18px"
      }}
      onClick={() => submitRating(product.product_id, star)}
    >
      ★
    </span>
  ))}

  <span className="ms-2">
    ({product.avg_rating ? Number(product.avg_rating).toFixed(1) : "0"})
  </span>

</div>

                {/* ✅ COMPANY INFO */}
                <div className="d-flex align-items-center gap-2 border-top pt-3 mb-3">

                  <img
                    src={
                      product.company_logo
                        ? img_url + product.company_logo
                        : "https://via.placeholder.com/40"
                    }
                    alt="company"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />

                  <div>
                    <div
                          className="fw-semibold text-dark"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate("/company", {
                              state: {
                                company: {
                                  user_id: product.user_id,
                                  company_name: product.company_name,
                                },
                              },
                            })
                          }
                        >
                      {product.company_name || "Unknown Company"}
                    </div>
                    <small className={product.role === "company" ? "text-success" : "text-muted"}>
  {product.role === "company" ? "✔ Verified Company" : "Unverified"}
</small>
                  </div>

                    
                </div>
                

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