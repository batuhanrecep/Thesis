import { useLocation } from "react-router-dom";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import "./cart.css"

function Payment() {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.totalAmount) {
    return <p>Ödeme bilgileri bulunamadı.</p>;
  }

  const { totalAmount } = state;

  return (
    <div className="d-flex aling-items-center justify-content-center my-5">
      <section className="">
        <div className="row d-flex justify-content-center">
            <div className="border bg-light rounded-3">
              <div className="card-body p-4">
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

                  {/* <div className="form-outline mb-4"><label className="form-label" htmlFor="formControlLgXsd">İsim Alanı</label>
                  <input type="text" id="formControlLgXsd" className="form-control form-control-lg"
                    value="Adınız Soyadınız" />
                </div>

                <div className="row mb-4">
                  <div className="col-7">
                    <div className="form-outline"><label className="form-label" htmlFor="formControlLgXM">Kart Numarası</label>
                      <input type="text" id="formControlLgXM" className="form-control form-control-lg"
                        value="1234 5678 1234 5678" />
                      
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-outline"><label className="form-label" htmlFor="formControlLgExpk">SKT</label>
                      <input type="password" id="formControlLgExpk" className="form-control form-control-lg"
                        placeholder="MM/YYYY" />
                      
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-outline"><label className="form-label" htmlFor="formControlLgcvv">CVV</label>
                      <input type="password" id="formControlLgcvv" className="form-control form-control-lg"
                        placeholder="CVV" />
                    </div>
                  </div><div className="text-center pt-2"><button className="btn text-light">Kartımı Ekle</button></div>
                </div> */}
                </form>
              </div>
            </div>
          </div>
      </section>
      <section className="w-25 border bg-light rounded-3 mx-4 p-4">
      <h3 className="text-center pb-3">Adres Bilgilerim</h3>
      <div className="d-flex flex-wrap justify-content-center align-items-center" >
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 1</div>
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 2</div>
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 3</div>
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 4</div>
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 5</div>
        <div className="cart-address border p-1" style={{width:"calc(50% - 2px)", height:"60px"}}>Adres 6</div>
      </div>
        
      </section>

      <section className="w-25 border bg-light rounded-3 p-4 position-relative">
      <h3 className="text-center">Ödeme</h3>
      <h5>Ödeme bilgileri, mesafeli satış sözleşmesi ..</h5>
        <div className="checkdone text-center">
          <div className="fs-4 pt-2">
            <b>Ödenecek Tutar: <span className="text-success">{totalAmount.toFixed(2)} TL</span></b>
          </div>
          <div className="fs-4 pt-2">
            <button className="btn btn-lg text-light"> Ödemeyi Tamamla </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;
