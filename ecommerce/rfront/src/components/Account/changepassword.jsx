import { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async () => {
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError("Yeni şifreler uyuşmuyor.");
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/changepassword/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirm: confirmNewPassword
          })
        });

        if (response.ok) {
          setSuccess(true);
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          const errorMessage = await response.json();
          setError(`Şifre değiştirme başarısız. Hata: ${errorMessage}`);
        }
      } catch (error) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-center border-bottom pb-2">Şifre Değiştir</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Şifre değiştirme başarılı.</div>}
      <div className="w-50 me-auto ms-auto">
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">Eski Şifre</label>
        <input
          type="password"
          className="form-control"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">Yeni Şifre</label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmNewPassword" className="form-label">Yeni Şifre Tekrar</label>
        <input
          type="password"
          className="form-control"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleChangePassword}>Şifreyi Değiştir</button>
      </div>
    </div>
  );
};

export default ChangePassword;
