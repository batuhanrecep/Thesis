import { useState, useEffect } from "react";
import "./slider.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [homeProducts2, setHomeProducts2] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.is_slide);
        const filteredProducts2 = data.filter((product) => product.is_offer);

        setHomeProducts(filteredProducts);
        setHomeProducts2(filteredProducts2);
      })
      .catch((error) => console.error("API Hatası:", error));
  }, []);

  return (
    <div className="slider-container">
      {homeProducts.slice(0, 1).map((product) => (
        <div key={product.id} className="slide">
          <img
            src={product.image}
            alt={product.title}
            className="slide-image"
          />
          <div className="slide-caption">
            {product.title}
            <div className="slide-description">{product.description}</div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent position-absolute bottom-0">
            <div className="text-center ">
              <Link
                to={`/product/${product.id}#${product.slug}`}
                className="mt-auto text-light urunegit"
              >
                Ürüne Git
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="sliderright">
        {homeProducts2.slice(0, 1).map((product) => (
          <div key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="slide-image2"
            />
            <div className="slide-caption2 h-100">
              HAFTANIN FIRSATI
              <div className="slide-description pe-5 h-75 d-flex flex-column justify-content-end">
                <h3 className="mb-auto">{product.title}</h3>
                <h3>%{product.discount_percentage} İNDİRİM FIRSATI</h3>
                <h3><del>{product.regular_price / ((100 - product.discount_percentage) / 100)} TL</del></h3>
                <h1>{product.regular_price} TL</h1>
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 position-absolute bottom-0">
              <div className="text-center">
                <Link
                  to={`/product/${product.id}#${product.slug}`}
                  className="mt-auto urunegit"
                >
                  Ürüne Git
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
