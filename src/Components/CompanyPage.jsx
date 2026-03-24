import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const CompanyPage = () => {
  const { state } = useLocation();
  const company = state?.company;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const img_url = "https://vicmakau.alwaysdata.net/static/images/";

  const fetchCompanyProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://vicmakau.alwaysdata.net/api/get_company_products/${company.user_id}`
      );

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (company) fetchCompanyProducts();
  }, []);

  return (
    <div className="container py-4">
      <h2>{company.company_name}</h2>

      {loading && <Loader />}

      <div className="row">
        {products.map((p) => (
          <div key={p.product_id} className="col-md-3">
            <div className="card">
              <img
                src={img_url + p.product_photo}
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h6>{p.product_name}</h6>
                <p>Ksh. {p.product_cost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;