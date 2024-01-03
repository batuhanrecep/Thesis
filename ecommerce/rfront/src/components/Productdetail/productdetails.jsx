import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productdetail.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);

        if (!response.ok) {
          throw new Error('Ürün bulunamadı');
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('API Hatası:', error.message);
        setError('Ürün bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/basket/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('API Hatası');
      }

      console.log(`Ürün ID ${productId} sepete eklendi. Miktar: ${quantity}`);
    } catch (error) {
      console.error('API Hatası:', error);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <p>Ürün bilgileri yükleniyor...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <>
      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            className="product-detail-image"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <div className="product-info-container">
          <h1 className='fw-bold'>{product.title}</h1>
          <h5 style={{marginTop:'-10px'}}>Satıcı Adı</h5>
          <p className='product-p' dangerouslySetInnerHTML={{ __html: product.description }} />
          {product.discount_percentage ? (
            <>
              <h5>
                <del style={{marginRight:'10px'}}>
                  {(product.regular_price / ((100 - product.discount_percentage) / 100)).toFixed(2)} TL
                </del>
                <span style={{color:'green', fontWeight:'bold'}}>
                  %{product.discount_percentage} İNDİRİM!
                </span>
              </h5>
              <h1 style={{color:'green', fontWeight:'bold'}}>{product.regular_price} TL</h1>
            </>
          ) : (
            <h1>{Number(product.regular_price).toFixed(2)} TL</h1>
          )}
          <h6>{product.stock > 0 ? `Stokta ${product.stock} adet Var` : "Stokta Yok"}</h6>

          <div>
            <button className="btn btn-outline-light me-2" onClick={decreaseQuantity}>-</button>
            <span className='fw-bold'>{quantity}</span>
            <button className="btn btn-outline-light ms-2" onClick={increaseQuantity}>+</button>
            <button className="btn btn-outline-light mt-auto px-5 py-2" onClick={addToCart}>
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
