import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './all-products.css';

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProductTitle, setAddedProductTitle] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = () => {
        fetch('http://127.0.0.1:8000/api/products/')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('API Hatası:', error));
    };

    const fetchCategories = () => {
        fetch('http://127.0.0.1:8000/api/categories/all/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('API Hatası:', error));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterProducts(category);
    };

    const filterProducts = (category) => {
        let filtered = products;

        if (category !== 'all') {
            filtered = filtered.filter(product => product.categories.includes(category));
        }

        setFilteredProducts(filtered);
    };

    const addToCart = async (productId, productTitle) => {
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

            setIsModalOpen(true);
            setAddedProductTitle(productTitle);

            // Modal'ı 5 saniye sonra kapat
            setTimeout(() => {
                setIsModalOpen(false);
                setAddedProductTitle(""); // Eklenen ürün bilgisini temizle
            }, 5000);

        } catch (error) {
            console.error('API Hatası:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAddedProductTitle(""); // Eklenen ürün bilgisini temizle
    };

    return (
        <section className="py-3">
            <div className="container-fluid mt-4">
                <div className="row ">
                    {/* Sol taraftaki filtre bölümü */}
                    <div className="col-md-3 mb-5 filter-section">
                        <h4 className="mb-3 h2">Filtrele</h4>

                        {/* Kategori filtresi */}
                        <div className="mb-4 category-filter">
                            <h6 className="text-uppercase mb-3">Kategori</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <button
                                        className={` btn-link text-decoration-none text-dark fw-bold fs-5 ${selectedCategory === 'all' ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange('all')}
                                    >
                                        Tümü
                                    </button>
                                </li>
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <button
                                            className={`btn-link text-decoration-none text-dark fw-bold fs-5 ${selectedCategory === category.id ? 'active' : ''}`}
                                            onClick={() => handleCategoryChange(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sağ taraftaki ürün listesi */}
                    <div className="col-md-9">
                        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center product-list">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="col mb-5 product-card">
                                    <div className="card h-100" style={{ overflow: 'hidden' }}>
                                        <Link to={`/product/${product.id}#${product.slug}`}>
                                            <img
                                                className="card-img-top"
                                                src={product.images[0]?.image ?? "../src/assets/images/resimyok.jpg"}
                                                alt={product.title}
                                                style={{ width: '268px', height: '185px' }}
                                            />
                                        </Link>
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder">
                                                    <Link to={`/product/${product.id}#${product.slug}`}>
                                                        {product.title.length > 25 ? `${product.title.slice(0, 25)}..` : product.title} 
                                                    </Link>
                                                </h5>
                                                {`${product.regular_price} TL`}
                                            </div>
                                            {product.description.length > 75 ? `${product.description.slice(0, 75)}..` : product.description}
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-outline-dark mt-auto"
                                                    onClick={() => addToCart(product.id, product.title)}
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
                </div>
            </div>
            {isModalOpen && (
                <div className="sepet-modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p><b>{addedProductTitle}</b> sepetinize eklenmiştir.</p>
                </div>
            )}
        </section>
    );
}

export default AllProducts;
