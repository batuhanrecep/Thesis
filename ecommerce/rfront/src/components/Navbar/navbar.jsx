import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyNavbar() {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/categories/all/"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("API Hatası:", response.statusText);
        }
      } catch (error) {
        console.error("API Hatası:", error);
      }
    };

    const fetchCartItemCount = async () => {
      try {
        const userToken = localStorage.getItem("token");

        // Kullanıcı giriş yapmışsa
        if (userToken) {
          const response = await fetch(
            "http://127.0.0.1:8000/api/basket/items/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const itemCount = data.reduce(
              (total, item) => total + item.quantity,
              0
            );
            setCartItemCount(itemCount);
          } else {
            console.error("API Hatası:", response.statusText);
          }
        }
      } catch (error) {
        console.error("API Hatası:", error);
      }
    };

    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    fetchCategories();
    fetchCartItemCount();
    checkLoggedIn();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg border-bottom"
        style={{ height: "130px" }}
      >
        <div
          className="container-fluid"
          style={{ width: "1650px", fontFamily: "Roboto, sans-serif" }}
        >
          <Link to="/" className="navbar-brand">
            <img
              src={`${window.location.origin}/src/assets/images/logo.png`}
              style={{ width: "155px", height: "43px" }}
              alt="Logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-auto"
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px 0 0 5px",
                height: "50px",
                lineHeight: "2",
                padding: "0 15px",
                backgroundColor: "#f7f7f7",
              }}
            >
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{zIndex:"3"}}
                >
                  KATEGORILER
                </Link>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`category/${category.slug}`}
                      className="dropdown-item"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>

            <form className="d-flex align-items-center">
              <div className="input-group ">
                <input
                  className="form-control mb-0"
                  type="search"
                  placeholder="Ara"
                  aria-label="Search"
                  style={{
                    minWidth: "600px",
                    height: "50px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#f3f3f3",
                  }}
                />
                <button
                  className="btn btn-outline-success border-0"
                  type="submit"
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "-45px",
                    color: "white",
                  }}
                >
                  <i className="fas fa-search fa-lg"></i>
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link fw-bold">
                    Giriş yap/Kayıt ol
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item" style={{ marginRight: "20px" }}>
                    <Link to="/account" className="nav-link">
                      <i className="fas fa-user fa-lg"></i>
                    </Link>
                  </li>
                  <li className="nav-item" style={{ marginRight: "20px" }}>
                    <Link to="/liked" className="nav-link">
                      <i className="fas fa-heart fa-lg"></i>
                    </Link>
                  </li>
                  <li className="nav-item position-relative">
                    <Link to="/cart" className="nav-link">
                      <i className="fas fa-shopping-cart fa-lg"></i>
                      {cartItemCount > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-15px",
                            right: "-2px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            padding: "1px 6px",
                            color: "white",
                          }}
                        >
                          {cartItemCount}
                        </div>
                      )}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <nav
        className="navbar navbar-expand-lg sticky-top bg-white"
        style={{ height: "70px", zIndex:"2" }}
      >
        <div className="container-fluid fw-bold" style={{ width: "1650px" }}>
          <div className="dropdown" style={{ marginRight: "20px" }}>
            <button
              className="btn btn-secondary dropdown-toggle fw-bold"
              type="button"
              id="categoryDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                height: "50px",
                lineHeight: "2",
                padding: "0 30px",
                backgroundColor: "#8A2BE2",
              }}
            >
              <i className="fa-solid fa-bars"></i>
              <span style={{ paddingLeft: "15px" }}>TÜM KATEGORİLER</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="categoryDropdown">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`category/${category.slug}`}
                  className="dropdown-item"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <ul
            className="navbar-nav me-auto"
            style={{ display: "flex", gap: "15px" }}
          >
            {categories.map((category) => (
              <li className="nav-item" key={category.id}>
                <Link to={`category/${category.slug}`} className="nav-link">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MyNavbar;