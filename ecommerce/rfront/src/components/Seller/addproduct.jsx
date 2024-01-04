import { useState } from "react";
import "./style.css"

function AddProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    stock: 0,
    description: "",
    regular_price: 0,
    discount_percentage: 0,
    images: [],
    uploaded_images: [],
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductData((prevData) => ({
      ...prevData,
      uploaded_images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const formData = new FormData();
        for (const key in productData) {
          if (key === "images" || key === "uploaded_images") {
            for (let i = 0; i < productData[key].length; i++) {
              formData.append(`${key}[${i}]`, productData[key][i]);
            }
          } else {
            formData.append(key, productData[key]);
          }
        }

        const response = await fetch("http://127.0.0.1:8000/api/products/add/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Ürün eklenirken bir hata oluştu.");
        }

        openModal();
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error("API Hatası:", error);
      setErrorMessage("Ürün eklenirken bir hata oluştu.");
      openModal();
    }
  };

  return (
    <div>
      <h2>Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label>Ürün Başlığı:</label>
        <input type="text" name="title" value={productData.title} onChange={handleInputChange} required />

        <label>Ürün Açıklaması:</label>
        <textarea name="description" style={{width:"100%"}} value={productData.description} onChange={handleInputChange} required />

        <label>Fiyat:</label>
        <input type="number" name="regular_price" value={productData.regular_price} onChange={handleInputChange} required />

        <label>İndirim Oranı (%):</label>
        <input type="number" name="discount_percentage" value={productData.discount_percentage} onChange={handleInputChange} required />

        <label>Stok Sayısı:</label>
        <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} required />

        <label>Ürün Resimleri:</label>
        <input type="file" name="images" multiple onChange={handleImageChange} required />

        <button type="submit" className="btn text-light">Ürünü Ekle</button>
        <div className={`custom-modal ${isModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>Ürününüz başarıyla eklenmiştir.</p>
          )}
        </div>
      </div>
      </form>
    </div>
  );
}

export default AddProduct;
