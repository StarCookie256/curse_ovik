import './LoginPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { dataUpdate } from '../../services/dataUpdate.js';
import { useDispatch } from 'react-redux';

function LoginPage(){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regError, setRegError] = useState(null);
  const dispatch = useDispatch();
  
  const { login: authLogin, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (error) {
      setRegError(error);
      setIsSubmitting(false);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    setRegError(null);
    e.preventDefault();
    setIsSubmitting(true);

    if (!login || login.trim() === '') {
      setRegError('Поле "Почта" не заполнено!');
      setIsSubmitting(false);
      return false;
    }
    if (!password || password.trim() === '') {
      setRegError('Поле "Пароль" не заполнено!');
      setIsSubmitting(false);
      return false;
    }

    try {
      await authLogin(login, password);
      navigate(from, { replace: true });
    } catch (err) {
      // setRegError(error || err.message || "Ошибка авторизации");
      // ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
      dispatch(dataUpdate());
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-title">Вход</h2>
      
      {regError && <div className="login-page-error">{regError}</div>}

      <form 
        className='login-page-form'
        onSubmit={handleSubmit}
      >
        <div className="login-page-input-container login">
          <label>Почта:</label>
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