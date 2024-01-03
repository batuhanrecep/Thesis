import { useState, useEffect } from "react";

function Membership() {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/auth/getuser/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setUserInfo(data);
          setEditedUserInfo(data);
        })
        .catch(error => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/getuser/", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedUserInfo)
        });

        if (response.ok) {
          setUserInfo(editedUserInfo);
          setIsEditing(false);
          window.location.reload();
        } else {
          console.error("Error updating user information:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedUserInfo({
      ...editedUserInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {userInfo ? (
        <div className="fw-bold">
          <h2 className="text-center border-bottom pb-2">Üyelik Bilgilerim</h2>
          {isEditing ? (
            <div>
              <p>Email: <input type="text" name="email" value={editedUserInfo.email} onChange={handleInputChange} /></p>
              <p>Ad: <input type="text" name="firstname" value={editedUserInfo.firstname} onChange={handleInputChange} /></p>
              <p>Soyad: <input type="text" name="lastname" value={editedUserInfo.lastname} onChange={handleInputChange} /></p>
              <p>Telefon: <input type="text" name="phone" value={editedUserInfo.phone} onChange={handleInputChange} /></p>
              <p className="small">NOT: Güncelleme işlemi yapıldığında eski veriler silinir.</p>
              <button className="btn text-light fw-bold" onClick={handleSaveClick}>Kaydet</button>
              <button className="btn text-light ms-2 fw-bold" onClick={handleCancelClick}>İptal</button>
            </div>
          ) : (
            <div>
              <p>Email: <span className="fw-lighter">{userInfo.email}</span></p>
              <p>Ad: <span className="fw-lighter">{userInfo.firstname}</span></p>
              <p>Soyad: <span className="fw-lighter">{userInfo.lastname}</span></p>
              <p>Telefon: <span className="fw-lighter">{userInfo.phone}</span></p>
              <button className="btn text-light fw-bold" onClick={handleEditClick}>Düzenle</button>
            </div>
          )}
        </div>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </div>
  );
}

export default Membership;
