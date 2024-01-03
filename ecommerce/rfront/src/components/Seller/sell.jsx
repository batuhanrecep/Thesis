import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    console.log("isSeller:", isSeller);
    if (isSeller) {
      navigate("/sell");
    }
  }, [isSeller, navigate]);

  return (
    <div className="container mt-5 fs-5 bg-light rounded-3">
      <div className="row">
        <div className="col-md-12 p-3">
          <h2 className="text-center border-bottom pb-2">Satıcı Paneli</h2>
          <p>Panel içeriği..</p>
        </div>
      </div>
    </div>
  );
}

export default Sell;
