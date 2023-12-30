import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      <p>Çıkış yapılıyor...</p>
    </div>
  );
};

export default Logout;