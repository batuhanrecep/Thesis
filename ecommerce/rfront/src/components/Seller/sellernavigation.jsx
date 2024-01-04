import { Link } from "react-router-dom";

function SellerNavigation() {
  return (
    <div className="seller-navigation" style={{ width: "300px" }}>
      <h3>Satıcı Paneli</h3>
      <ul>
        <li>
          <Link to="/sell/add-product">Ürün Ekle</Link>
        </li>
        <li>
          <Link to="/sell/my-products">Ürünlerim</Link>
        </li>
      </ul>
    </div>
  );
}

export default SellerNavigation;
