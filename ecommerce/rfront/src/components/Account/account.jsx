import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Bu fonksiyon JWT token'ı çözümlemek için kullanılabilir
const parseJwt = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.email || null;
    } catch (e) {
      return null;
    }
  };
  
  function Account() {
    const [email, setEmail] = useState("");
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const userEmail = parseJwt(token);
  
      if (userEmail) {
        setEmail(userEmail);
      }
    }, []);
  
    return (
      <div className="w-50 ms-auto me-auto my-5">
        <h2>Hesabım</h2>
        <p>E-posta: {email}</p>
        <Link to="/logout">Çıkış Yap</Link>
      </div>
    );
  }
  
  export default Account;
