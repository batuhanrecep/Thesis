import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './products.css'

const Products = ({ onProductAddedToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(-12)))
      .catch((error) => console.error("API Hatası:", error));
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/basket/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('API Hatası');
      }

      console.log(`Ürün ID ${productId} sepete eklendi.`);

      onProductAddedToCart();

    } catch (error) {
      console.error('API Hatası:', error);
    }
  };

  return (
    <section className="py-4">
      <div className="container-fluid">
        <div className="row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-6 justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col mb-5">
              <div className="card h-100" style={{ overflow: "hidden" }}>
                <Link to={`/product/${product.id}#${product.slug}`}>
                  <img
                    className="card-img-top"
                    src={product.image || "src/assets/images/resimyok.jpg"}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "185px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="card-body p-2">
                  <div className="text-center">
                    <h5 className="fw-bolder">
                      <Link to={`/product/${product.id}#${product.slug}`}>
                        {product.title.length > 75
                          ? `${product.title.slice(0, 77)}..`
                          : product.title}
                      </Link>
                    </h5>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {product.discount_percentage == 0 ? `` : `%${product.discount_percentage} ↓`}
                    </span>
                    <h4 style={{ color: "green", fontWeight: "bold" }}>
                      {Math.floor(product.regular_price)}<span className="h6 fw-bold">{(product.regular_price % 1).toFixed(2).slice(1)}</span> TL
                    </h4>
                  </div>
                  {product.description.length > 140
                    ? `${product.description.slice(0, 140)}...`
                    : product.description}
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button
                      className="btn btn-outline-light mt-auto"
                      onClick={() => {
                        addToCart(product.id);
                        onProductAddedToCart();
                      }}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Products.propTypes = {
  onProductAddedToCart: PropTypes.func.isRequired,
};

export default Products;
