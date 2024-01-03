import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Membership from "./membership";
import Address from "./addresses";
import Order from "./orders";
import ChangePassword from "./changepassword";
import Sell from "../Seller/sell";
import "./style.css";

function Account() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);

    if (item === "logout") {
      setConfirmLogout(true);
    } else if (item === "seller-panel" && userType === "SELLER") {
      navigate("/sell");
    } else if (item === "become-seller" && userType !== "SELLER") {
      navigate("/become-a-seller");
    } else {
      navigate("/account");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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

          setUserFullName(`${data.firstname} ${data.lastname}`);
          setUserType(data.type);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogoutConfirmation = (confirmed) => {
    if (confirmed) {
      navigate("/logout");
    } else {
      setConfirmLogout(false);
    }
  };

  return (
    <div className="container mt-5 fs-5 bg-light rounded-3">
      <div className="row">
        <div className="col-md-4 p-3 border-end fs-4">
          <h2 className="text-center border-bottom pb-2">{userFullName}</h2>
          <ul className="list-unstyled ps-3 pt-3">
            <li
              onClick={() => handleItemClick("membership")}
              className={selectedItem === "membership" ? "fw-bold border-start ps-2" : ""}
              style={{ cursor: "pointer" }}
            >
              Üyelik Bilgilerim
            </li>
            <li
              onClick={() => handleItemClick("addresses")}
              className={selectedItem === "addresses" ? "fw-bold border-start ps-2" : ""}
              style={{ cursor: "pointer" }}
            >
              Adreslerim
            </li>
            <li
              onClick={() => handleItemClick("orders")}
              className={selectedItem === "orders" ? "fw-bold border-start ps-2" : ""}
              style={{ cursor: "pointer" }}
            >
              Siparişlerim
            </li>
            <li
              onClick={() => handleItemClick("change-password")}
              className={selectedItem === "change-password" ? "fw-bold border-start ps-2" : ""}
              style={{ cursor: "pointer" }}
            >
              Şifre Değiştir
            </li>

            <li
              onClick={() => handleItemClick("logout")}
              className={selectedItem === "logout" ? "fw-bold border-start ps-2" : ""}
              style={{ cursor: "pointer" }}
            >
              Çıkış Yap
            </li>

            {userType === "SELLER" && (
              <li
                onClick={() => handleItemClick("seller-panel")}
                className={selectedItem === "seller-panel" ? "fw-bold border-start ps-2" : ""}
                style={{ cursor: "pointer", paddingTop: "30px" }}
              >
                Satıcı Paneli <i className="fa-solid fa-arrow-up-right-from-square small ps-2"></i>
              </li>
            )}

            {userType !== "SELLER" && (
              <li
                onClick={() => handleItemClick("become-seller")}
                className={selectedItem === "become-seller" ? "fw-bold border-start ps-2" : ""}
                style={{ cursor: "pointer", paddingTop: "30px" }}
              >
                Satıcı Ol
              </li>
            )}
          </ul>
        </div>

        <div className="col-md-8 p-3">
          {!selectedItem && (
            <Membership />
          )}
          {selectedItem === "membership" && (
            <Membership />
          )}
          {selectedItem === "addresses" && (
            <Address />
          )}
          {selectedItem === "orders" && (
            <Order />
          )}
          {selectedItem === "change-password" && (
            <ChangePassword />
          )}
          {selectedItem === "logout" && confirmLogout && (
            <div>
              <p>Çıkış Yapmak istediğinizden emin misiniz?</p>
              <button className="btn text-light fw-bold" onClick={() => handleLogoutConfirmation(true)}>
                Evet, Eminim
              </button>
              <button className="btn text-light ms-2 fw-bold" onClick={() => handleLogoutConfirmation(false)}>
                Hayır, Vazgeç
              </button>
            </div>
          )}
          
          {selectedItem === "seller-panel" && (
            <Sell />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
