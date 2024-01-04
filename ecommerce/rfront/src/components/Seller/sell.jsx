import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SellerNavigation from "./sellernavigation";
import AddProduct from "./addproduct";
import MyProducts from "./myproduct";

function Sell() {
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSellerStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://127.0.0.1:8000/api/auth/getuser/", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (!response.ok) {
            throw new Error("User information fetch failed");
          }

          const data = await response.json();
          setIsSeller(data.types && data.types.includes("SELLER"));
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    checkSellerStatus();
  }, []);

  useEffect(() => {
    if (isSeller) {
      navigate("/sell/add-product");
    }
  }, [isSeller, navigate]);

  return (
    <div className="container mt-5 fs-5 bg-light rounded-3">
      <div className="row">
        <div className="col-md-3 p-3">
          <SellerNavigation />
        </div>
        <div className="col-md-9 p-3">
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-products" element={<MyProducts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Sell;
