import './LoginPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
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
      </form>

      {process.env.NODE_ENV === 'development' && (
        <div className="test-data">
          <h3>Тестовые данные:</h3>
          <p>Логин: <strong>123</strong>, Пароль: <strong>123</strong></p>
          <p>Логин: <strong>user</strong>, Пароль: <strong>user</strong></p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;