import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Şifre kontrol
      if (password !== confirmPassword) {
        setError('Şifreler uyuşmuyor.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/auth/register/customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
          phone,
        }),
      });

      if (response.ok) {
        // login sayfasına yönlendir
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={{ width: '450px', margin: '0 auto', marginTop: '50px', borderRadius:'15px'}} className='bg-light p-4'>
      <h2 className="text-center">Kayıt Ol</h2>
      <div>
        <label className='fw-bold'>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Şifre:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Şifre (Tekrar):</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Ad:</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Soyad:</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Telefon:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button style={{ width:'100%', borderRadius: '10px', fontWeight:'bold', marginTop:'15px', backgroundColor:'#8A2BE2' }}  onClick={handleSignup}>Kayıt Ol</button>
      <p className='text-center pt-3'>Zaten bir hesabınız var mı? <Link to="/login"><label className='fw-bold fs-5 '  style={{cursor: "pointer"}}>Giriş Yap</label></Link></p>
    </div>
  );
};

export default Signup;
