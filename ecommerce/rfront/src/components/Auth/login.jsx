import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberMe');
        }

        navigate('/');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Giriş başarısız. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={{ width: '450px', margin: '0 auto', marginTop: '50px', borderRadius: '15px' }} className='bg-light p-4'>
      <h2 className='text-center'>Giriş Yap</h2>
      <div>
        <label className='fw-bold'>Email:</label>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className='fw-bold'>Şifre:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link to='/forgot-password'>
          <label className='small'>Şifremi Unuttum</label>
        </Link>
      </div>
      <div className='mt-3'>
        <label className='fw-bold d-flex'>
          <input
            className='w-auto me-2 mb-0'
            type='checkbox'
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <span>Beni hatırla</span>
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        style={{ width: '100%', borderRadius: '10px', fontWeight: 'bold', marginTop: '15px', backgroundColor: '#8A2BE2' }}
        onClick={handleLogin}
      >
        Giriş Yap
      </button>
      <p className='text-center pt-3'>
        Hesabınız yok mu?{' '}
        <Link to='/signup'>
          <label className='fw-bold fs-5 ' style={{ cursor: 'pointer' }}>
            Kayıt Ol
          </label>
        </Link>
      </p>
    </div>
  );
};

export default Login;
