import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './featured.css';

function Latest() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("API Hatası:", error));
  }, []);

  return (
    <div>
      <h1 className='featured-title'>Yeni Ürünler <Link to="/all-products" className="see-all-link fs-5 ms-5 h6">
          Tümünü Gör →
        </Link></h1>
      <div className="product-list">
        {products
          .slice(-4)
          .map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}#${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-details">
                  <p className="product-category">
                    {product.category_name}
                  </p>
                  <h3 className="product-title">{product.title}</h3>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Latest;