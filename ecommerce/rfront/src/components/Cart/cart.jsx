import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Featured from '../Featured/featured';
import Products from '../Products/products';
import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [originalTotalAmount, setOriginalTotalAmount] = useState(0);

  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleProductAddedToCart = () => {
    setReloadCart((prevReloadCart) => !prevReloadCart);
    setDiscountApplied(false);
    setCouponCode("");
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/basket/items/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ quantity: updatedQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("API Hatası");
      }

      setCartItems((prevCartItems) => {
        const newCartItems = prevCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
        return newCartItems;
      });

      setReloadCart((prevReloadCart) => !prevReloadCart);

      setDiscountApplied(false);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setSelectedItemId(id);
  };

  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/basket/items/${selectedItemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("API Hatası");
      }

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== selectedItemId)
      );
      setReloadCart((prevReloadCart) => !prevReloadCart);

      setDiscountApplied(false);
      setCouponCode(""); 
    } catch (error) {
      console.error("API Hatası:", error);
    } finally {
      setSelectedItemId(null);
    }
  };

  const applyDiscount = () => {
    if (discountApplied || !couponCode.trim()) {
      return;
    }
    if (couponCode === "Kupon") {
      setTotalAmount((prevTotalAmount) => prevTotalAmount * 0.8); // %20 indirim
      setDiscountApplied(true);
    } else {
      alert("Geçersiz kupon kodu. Lütfen doğru bir kupon kodu girin.");
    }
  };

  const handleCompletePurchase = () => {
    navigate("/payment", { state: { totalAmount } });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/basket/items/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + item.total_price, 0);
        setTotalAmount(total);
        setOriginalTotalAmount(total);
      })
      .catch((error) => console.error("API Hatası:", error));
  }, [userToken, reloadCart]);

  return (
    <>
      <div className="cart-container">
        <div className="left-column">
          {cartItems.length === 0 ? (
            <div>
              <p className="pt-3 ps-5 fw-bold fs-5">
                Sepetinizde ürün bulunmamaktadır.
              </p>
              <p className="ps-5 pt-3 fw-bold fs-5">
                Sepetinizi doldurmak için aşağıdaki ürünleri incelemeye başlayabilirsiniz.
              </p>
            </div>
          ) : (
            <table className="m-3 cart-table">
              <thead className="text-center">
                <tr>
                  <th className="col-7">ÜRÜNLER</th>
                  <th className="col-1">FİYAT</th>
                  <th className="col-1">ADET</th>
                  <th className="col-1">Toplam Fiyat</th>
                  <th className="col-2"></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="text-start">
                      <Link to={`/product/${item.product.id}`}>
                        <img
                          src={item.product.images[0]?.image ?? "../src/assets/images/resimyok.jpg"}
                          alt={item.product.title}
                          width={"90px"}
                        />
                        <span className="h5 ps-2 fw-bold ">
                          {item.product.title}
                        </span>
                      </Link>
                    </td>
                    <td className="fw-bold fs-5">
                      {item.product.regular_price} TL
                    </td>
                    <td className="fw-bold">
                      <button
                        className="button-quantity"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="button-quantity"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td className="fw-bold">
                      <span className="text-success fs-5 overflow-hidden">
                        {item.total_price}{" "}
                        TL
                      </span>
                    </td>
                    <td>
                      <button
                        className="border-0"
                        onClick={() => handleDeleteConfirmation(item.id)}
                      >
                        Sil
                      </button>
                      {selectedItemId === item.id && (
                        <div>
                          <p className="fw-bold text-danger mb-0">
                            Emin misiniz?
                          </p>
                          <button
                            className="small bg-danger text-white border-1"
                            onClick={handleDeleteItem}
                          >
                            Evet
                          </button>
                          <button
                            className="small bg-danger text-white border-1 ms-1"
                            onClick={() => setSelectedItemId(null)}
                          >
                            Hayır
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className={cartItems.length === 0 ? "" : "right-column position-relative"}>
          {cartItems.length === 0 ? (
            <p></p>
          ) : (
            <>
              <h3 className="text-center">Sepet Özeti</h3>
              <h5>Kupon Ekle:</h5>
              <input
                type="text"
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="btn btn-outline-primary odeme"
                onClick={applyDiscount}
              >
                Onayla
              </button>

              <div className="total-amount ">
                <h5>Toplam Fiyat:</h5>
                <h1>
                  {discountApplied ? (
                    <>
                      <span className="text-secondary fw-light text-decoration-line-through h3 d-block">
                        {(originalTotalAmount).toFixed(2)} TL
                      </span>{" "}
                      <span className="text-success fw-bold">
                        {(totalAmount).toFixed(2)} TL
                      </span>
                      <span className="h6 d-block fw-bold text-center">
                        Kuponunuz ile %20 indirim uygulandı.
                      </span>
                    </>
                  ) : (
                    <span className="text-success fw-bold">
                      {(totalAmount).toFixed(2)} TL
                    </span>
                  )}
                </h1>
              </div>
              <button className="btn text-light odeme fw-bold" onClick={handleCompletePurchase}>
                Alışverişi Tamamla
              </button>
            </>
          )}
        </div>
      </div>
      <div className="px-5"><Featured /></div>
      <div className="px-5"><Products onProductAddedToCart={handleProductAddedToCart} /></div>
    </>
  );
}

export default Cart;
