import "./fcategory.css";
import { Link } from 'react-router-dom';

function FCategory() {
  return (
    <div className="fcategory-container">
      <Link to="/category/elektronik" className="fcategory-box">
        <img
          src="src/assets/images/elektronik.png"
          alt="Background"
          className="fcategory-background"
        />
        <div className="fcategory-content">Geleceği Yakala</div>
        <div className="btn button">Elektronik →</div>
        </Link>
        <Link to="/category//kitap" className="fcategory-box">
        <img
          src="src/assets/images/kitap.png"
          alt="Background"
          className="fcategory-background"
        />
        <div className="fcategory-content">Bilgiye Yolculuk</div>
        <div className="btn button">Kitap →</div>
        </Link>
      <Link to="/category//moda" className="fcategory-box">
        <img
          src="src/assets/images/moda.png"
          alt="Background"
          className="fcategory-background"
        />
        <div className="fcategory-content">Stilini Keşfet</div>
        <div className="btn button">Moda →</div>
        </Link>
      
    </div>
  );
}

export default FCategory;
