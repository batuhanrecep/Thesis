import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import "./cart.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [faturaAddresses, setFaturaAddresses] = useState([]);
  const [kargoAddresses, setKargoAddresses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/address/all/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const faturaList = data.filter((address) => address.address_type === "B");
          const kargoList = data.filter((address) => address.address_type === "S");

          setFaturaAddresses(faturaList.slice(0, 6));
          setKargoAddresses(kargoList.slice(0, 6));
        })
        .catch((error) => {
          console.error("API Hatası:", error);
        });
    }
  }, []);

  const handleAddressClick = (id, addressType) => {
    // Adres tıklama işlemleri
    const updatedFaturaAddresses = faturaAddresses.map((address) => {
      if (address.id === id) {
        const token = localStorage.getItem("token");

        if (token) {
          fetch(`http://127.0.0.1:8000/api/address/default/${id}/`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ default: true }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Adres güncellenirken bir hata oluştu.");
              }
              return response.json();
            })
            .then(() => {
              const updatedFaturaAddresses = faturaAddresses.map((a) =>
                a.id === id ? { ...a, default: true } : { ...a, default: false }
              );
              setFaturaAddresses(updatedFaturaAddresses);
            })
            .catch((error) => console.error("API Hatası:", error));
        }
      } else if (address.address_type === addressType) {
        return { ...address, default: false };
      }
      return address;
    });

    const updatedKargoAddresses = kargoAddresses.map((address) => {
      if (address.id === id) {
        const token = localStorage.getItem("token");

        if (token) {
          fetch(`http://127.0.0.1:8000/api/address/default/${id}/`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ default: true }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Adres güncellenirken bir hata oluştu.");
              }
              return response.json();
            })
            .then(() => {
              const updatedKargoAddresses = kargoAddresses.map((a) =>
                a.id === id ? { ...a, default: true } : { ...a, default: false }
              );
              setKargoAddresses(updatedKargoAddresses);
            })
            .catch((error) => console.error("API Hatası:", error));
        }
      } else if (address.address_type === addressType) {
        return { ...address, default: false };
      }
      return address;
    });

    setFaturaAddresses(updatedFaturaAddresses);
    setKargoAddresses(updatedKargoAddresses);
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/order/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
      });

      if (!response.ok) {
        throw new Error("Ödeme işlemi başarısız oldu.");
      }

      navigate("/order-summary");
    } catch (error) {
      console.error("Ödeme işlemi sırasında bir hata oluştu:", error);
    }
  };

  if (!state || !state.totalAmount) {
    return <p>Ödeme bilgileri bulunamadı.</p>;
  }

  const { totalAmount } = state;

  return (
    <div className="d-flex align-items-center justify-content-center my-5">
      <section className="">
        <div className="d-flex justify-content-center">
          <div className="border bg-light rounded-3">
            <div className="card-body p-4 paymentcard">
              <div className="text-center mb-4">
                <h3>Kartlarım</h3>
                <h6>Kayıtlı kartlarınızı kullanın veya yeni ekleyin</h6>
              </div>
              <form action="">
                <p className="fw-bold mb-3">Kayıtlı Kartlarım:</p>

                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <FaCcMastercard className="fs-1 mb-5" />
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="formControlLgXc"
                        className="form-control form-control-lg"
                        value="**** **** **** 3193"
                      />
                      <label
                        className="form-label fw-bold text-danger text-center"
                        htmlFor="formControlLgXc"
                      >
                        Bu Kartı Kullan
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <a href="">Kartı Sil</a>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <FaCcVisa className="fs-1 mb-5" />
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="formControlLgXs"
                        className="form-control form-control-lg"
                        value="**** **** **** 4296"
                      />
                      <label
                        className="form-label fw-bold text-danger text-center"
                        htmlFor="formControlLgXs"
                      >
                        Bu Kartı Kullan
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <a href="">Kartı Sil</a>
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn text-light">Yeni kart ekle +</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-25 border bg-light rounded-3 mx-4 p-4 paymentcard">
        <h3 className="text-center pb-3">Adres Bilgilerim</h3>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div className="fatura-address w-100">
            <h5 className="mb-2 fw-bold">Fatura Adresi</h5>
            <div className="d-flex flex-wrap">
              {faturaAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`cart-address border p-1 ${address.default ? 'bg-mor' : ''}`}
                  style={{ width: "calc(33% - 2px)", height: "60px" }}
                  onClick={() => handleAddressClick(address.id, "B")}
                >
                  {address.address_name}
                </div>
              ))}
            </div>
          </div>

          <div className="spacer" style={{ height: "20px", width: "100%" }} />

          <div className="kargo-address w-100">
            <h5 className="mb-2 fw-bold">Kargo Adresi</h5>
            <div className="d-flex flex-wrap">
              {kargoAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`cart-address border p-1 ${address.default ? 'bg-mor' : ''}`}
                  style={{ width: "calc(33% - 2px)", height: "60px" }}
                  onClick={() => handleAddressClick(address.id, "S")}
                >
                  {address.address_name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-25 border bg-light rounded-3 p-4 position-relative paymentcard">
        <h3 className="text-center">Ödeme</h3>
        <h5>Ödeme bilgileri, mesafeli satış sözleşmesi ..</h5>
        <div className="checkdone text-center">
          <div className="fs-4 pt-2">
            <b>Ödenecek Tutar: <span className="text-success">{totalAmount.toFixed(2)} TL</span></b>
          </div>
          <div className="fs-4 pt-2">
        <button className="btn btn-lg text-light" onClick={handlePayment}>
          Ödemeyi Tamamla
        </button>
      </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;