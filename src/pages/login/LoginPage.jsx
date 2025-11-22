import './LoginPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';



function LoginPage(){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login: authLogin, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authLogin(login, password);
      navigate(from, { replace: true });
    } catch (err) {
      // ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-title">Вход</h2>
      
      {error && <div className="login-page-error">{error}</div>}

      <form 
        className='login-page-form'
        onSubmit={handleSubmit}
      >
        <div className="login-page-input-container login">
          <label>Логин:</label>
          <input
            className='login-page-input login'
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="login-page-input-container password">
          <label>Пароль:</label>
          <input
            className='login-page-input password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="login-page-submit-button">
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>

        <Link 
          className='login-page-register-container' 
          to={`/register`}
        >
          <button className="login-page-register">
            Регистрация
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;