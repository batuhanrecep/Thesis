import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/navbar";
import Products from "./components/Products/products";
import ProductDetail from "./components/Productdetail/productdetails";
import Slider from "./components/Slider/slider";
import "./App.css"
import Footer from "./components/Footer/footer";
import Featured from './components/Featured/featured';
import AllProducts from './components/Products/all-products'; 
import FCategory from './components/Featured/fcategory'
import Cart from './components/Cart/cart'
import Latest from './components/Featured/latest'
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Account from './components/Account/account';
import Logout from './components/Auth/logout';
import Sell from './components/Seller/sell';
import BecomeASeller from './components/Seller/become-a-seller';
import Payment from './components/Cart/payment';
import OrderSummary from './components/Cart/ordersummary';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/product/" element={<AllProducts />} />

          {!isLoggedIn ? (
            <>
              <Route path="/cart" element={<Navigate to="/login" />} />
              <Route path="/account" element={<Navigate to="/login" />} />
              <Route path="/logout" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sell/*" element={<Sell />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/become-a-seller" element={<BecomeASeller />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Slider />
      <FCategory />
      <Featured />
      <Latest />
      <Products />
    </>
  );
}

export default App;
