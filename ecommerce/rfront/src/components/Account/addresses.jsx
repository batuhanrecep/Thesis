import { useState, useEffect } from "react";

function Address() {
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/address/get/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setAddresses(data);
          setEditedAddress(data[0]); // Sadece ilk adresi düzenlenebilir adres olarak alıyoruz
        })
        .catch(error => {
          console.error("Error fetching addresses:", error);
        });
    }
  }, []);

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/address/update/${editedAddress.id}/`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAddress)
        });

        if (response.ok) {
          setAddresses([editedAddress, ...addresses.slice(1)]); // İlk adresi güncellenen adresle değiştirir
          setIsEditing(false);
          window.location.reload();
        } else {
          // Hata durumunda API'nin gönderdiği mesajı kontrol et
          const errorMessage = await response.json();
          console.error("Error updating address information:", errorMessage);
        }
      } catch (error) {
        console.error("Error updating address information:", error);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedAddress(null);
  };

  const handleInputChange = (e) => {
    setEditedAddress({
      ...editedAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleNewAddressInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSaveClick = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/address/all/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAddress)
        });

        if (response.ok) {
          setAddresses([newAddress, ...addresses]); // Yeni adresi ekler
          setIsAdding(false);
          window.location.reload();
        } else {
          // Hata durumunda API'nin gönderdiği mesajı kontrol et
          const errorMessage = await response.json();
          console.error("Error adding new address:", errorMessage);
        }
      } catch (error) {
        console.error("Error adding new address:", error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/address/all/${id}/`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const updatedAddresses = addresses.filter(address => address.id !== id);
          setAddresses(updatedAddresses);
          window.location.reload();
        } else {
          // Hata durumunda API'nin gönderdiği mesajı kontrol et
          const errorMessage = await response.json();
          console.error("Error deleting address:", errorMessage);
        }
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleViewAddressClick = (address) => {
    setEditedAddress(address);
    setSelectedAddress(address);
  };

  return (
    <div className="fw-bold">
      <h2 className="text-center border-bottom pb-2">Adres Bilgilerim</h2>
<div className="d-flex flex-row justify-content-between align-items-center position-relative flex-wrap">
{addresses.map(address => (
  <div onClick={() => handleViewAddressClick(address)} key={address.id} className="editButtonContainer" style={{ width: addresses.length === 2 ? "50%" : "calc(33.33% - 10px)", minHeight: "100px", border: "1px dotted black", marginBottom: "10px", position:"relative", padding:"6px" }}>
    <p className="my-0"><span className="fw-bold">{address.address_name}</span></p>
    <p className="mb-0 small"><span className="fw-lighter">{address.mahalle}, {address.cadde}, {address.sokak}, ...</span></p>
    <div className="text-center">
      <button className="btn text-light w-100 editButton" onClick={() => handleViewAddressClick(address)}> Düzenle </button>
    </div>
  </div>
  
))} <button className="fw-bold text-danger" style={{ width: addresses.length === 2 ? "50%" : "calc(33.33% - 10px)", minHeight: "100px", border: "1px dotted black", marginBottom: "10px", position:"relative", padding:"6px" }} onClick={() => setIsAdding(true)}>Adres Ekle</button>
        {selectedAddress && (
          <div className="modal fs-5">
            <h2>{selectedAddress.address_name}</h2>
            <p>Ülke: <span className="fw-lighter">{selectedAddress.country}</span></p>
            <p>Mahalle: <span className="fw-lighter">{selectedAddress.mahalle}</span></p>
            <p>Cadde: <span className="fw-lighter">{selectedAddress.cadde}</span></p>
            <p>Sokak: <span className="fw-lighter">{selectedAddress.sokak}</span></p>
            <p>Apartman: <span className="fw-lighter">{selectedAddress.apartman}</span></p>
            <p>Daire: <span className="fw-lighter">{selectedAddress.daire}</span></p>
            <p>Semt: <span className="fw-lighter">{selectedAddress.semt}</span></p>
            <p>Şehir: <span className="fw-lighter">{selectedAddress.sehir}</span></p>
            <p>Posta Kodu: <span className="fw-lighter">{selectedAddress.post_code}</span></p>
            <div className="d-flex align-items-center justify-content-center mt-3">
            <button className="btn text-light fw-bold me-1" onClick={() => setIsEditing(true)}>Güncelle</button>
            <button className="btn text-light fw-bold me-1" onClick={() => handleDeleteClick(selectedAddress.id)}>Sil</button>
            <button className="btn text-light fw-bold" onClick={handleCloseModal}>İptal</button></div>
          </div>
        )}
        {isEditing ? (
          <div className="modal">
            <p>Adres Adı: <input type="text" name="address_name" value={editedAddress.address_name || ""} onChange={handleInputChange} /></p>
            <p>Ülke: <input type="text" name="country" value={editedAddress.country || ""} onChange={handleInputChange} /></p>
            <p>Mahalle: <input type="text" name="mahalle" value={editedAddress.mahalle || ""} onChange={handleInputChange} /></p>
            <p>Cadde: <input type="text" name="cadde" value={editedAddress.cadde || ""} onChange={handleInputChange} /></p>
            <p>Sokak: <input type="text" name="sokak" value={editedAddress.sokak || ""} onChange={handleInputChange} /></p>
            <p>Apartman: <input type="text" name="apartman" value={editedAddress.apartman || ""} onChange={handleInputChange} /></p>
            <p>Daire: <input type="text" name="daire" value={editedAddress.daire || ""} onChange={handleInputChange} /></p>
            <p>Semt: <input type="text" name="semt" value={editedAddress.semt || ""} onChange={handleInputChange} /></p>
            <p>Şehir: <input type="text" name="sehir" value={editedAddress.sehir || ""} onChange={handleInputChange} /></p>
            <p>Posta Kodu: <input type="text" name="post_code" value={editedAddress.post_code || ""} onChange={handleInputChange} /></p>
            <div className="d-flex align-items-center justify-content-center mt-2">
            <button className="btn text-light fw-bold me-1" onClick={handleSaveClick}>Kaydet</button>
            <button className="btn text-light fw-bold" onClick={handleCancelClick}>İptal</button>
            </div>
          </div>
        ) : (
          ""
        )}
        
        {isAdding && (
          <div className="modal modalx">
            <p>Adres Adı: <input placeholder="Ev Adresim"  type="text" name="address_name" value={newAddress.address_name || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Ülke: <input placeholder="TR" type="text" name="country" value={newAddress.country || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Mahalle: <input type="text" name="mahalle" value={newAddress.mahalle || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Cadde: <input type="text" name="cadde" value={newAddress.cadde || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Sokak: <input type="text" name="sokak" value={newAddress.sokak || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Apartman: <input type="text" name="apartman" value={newAddress.apartman || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Daire: <input type="text" name="daire" value={newAddress.daire || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Semt: <input type="text" name="semt" value={newAddress.semt || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Şehir: <input type="text" name="sehir" value={newAddress.sehir || ""} onChange={handleNewAddressInputChange} /></p>
            <p>Posta Kodu: <input placeholder="61040" type="number" name="post_code" value={newAddress.post_code || ""} onChange={handleNewAddressInputChange} /></p>
            <p>address_type: <input type="text" name="address_type" value={newAddress.address_type || ""} onChange={handleNewAddressInputChange} /></p>
            
            <div className="d-flex align-items-center justify-content-center mt-2">
            <button className="btn text-light fw-bold me-1" onClick={handleAddSaveClick}>Kaydet</button>
            <button className="btn text-light fw-bold" onClick={handleCancelClick}>İptal</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;