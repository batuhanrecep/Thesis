import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './featured.css';

function Featured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("API Hatası:", error));
  }, []);

  return (
    <div>
      <h1 className='featured-title'>Öne Çıkanlar </h1>
      <div className="product-list">
        {products
          .filter((product) => product.is_featured === true)
          .slice(0, 4)
          .map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}#${product.slug}`}>
                <img
                  src={product.image || 'src/assets/images/resimyok.jpg'}
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

export default Featured;