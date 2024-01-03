import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BecomeASeller() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    if (agreed) {
      console.log("agreed");
      const token = localStorage.getItem("token");

      if (token) {
        fetch("http://127.0.0.1:8000/api/auth/getuser/", {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            types: ["SELLER"]
          })
        })
          .then(response => {
            if (response.ok) {
              console.log("Satıcı oldunuz");
              navigate("/sell");
            } else {
              console.error("Error updating user type:", response.statusText);
            }
          })
          .catch(error => {
            console.error("Error updating user type:", error);
          });
      }
    }
  };

  return (
    <div className="container mt-5 fs-5 bg-light rounded-3">
      <div className="row">
        <div className="col-md-12 p-3">
          <h2 className="text-center border-bottom pb-2">Satıcı Ol</h2>
          <p>Satıcı olmanın avantajları:</p>
          <ul>
            <li>Avantaj 1: Ürünlerinizi geniş bir kitleye tanıtma imkanı</li>
            <li>Avantaj 2: Sizi tercih eden müşterilere özel kampanya oluşturma</li>
            <li>Avantaj 3: Satışlarınızı kolayca takip etme ve yönetme</li>
          </ul>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreeCheckbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <label className="form-check-label" htmlFor="agreeCheckbox">
              Satıcı olmayı kabul ediyorum.
            </label>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAgree}
            disabled={!agreed}
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
}

export default BecomeASeller;