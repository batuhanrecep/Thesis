import { useState, useEffect } from "react";

function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/products/seller/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Seller products fetch failed");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching seller products:", error);
      }
    };

    fetchSellerProducts();
  }, []);

  return (
    <div>
      <h2>Ürünlerim</h2>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <div>
              {product.images.length > 0 && (
                <img
                  src={product.images[0].image}
                  alt={product.title}
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              )}
            </div>
            <p>{product.description.length > 90 ? `${product.description.slice(0, 90)}...` : product.description}</p>
            <p>Fiyat: {product.regular_price} TL</p>
            <p>İndirim Oranı: {product.discount_percentage}%</p>
            <p>Stok: {product.stock}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
