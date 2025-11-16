import { useState } from 'react';
import './RegisterPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterPage(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {register: reg, error} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    formDataToSend.append('Username', username);
    formDataToSend.append('Email', email);
    formDataToSend.append('Password', password);
    formDataToSend.append('Phone', phone);
    if (image) {
      formDataToSend.append('Image', image);
    }

    try {
      await reg(formDataToSend);
      navigate(from, { replace: true });
    } catch (err) {
      // ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
    <div className='register-page-container'>
      <h2 className='register-page-title'>Регистрация</h2>

      {error && <div className="register-page-error">{error}</div>}

      <form 
        className='register-page-form'
        onSubmit={handleSubmit}
      >
        <div className='register-page-general-info'>
          <div className="regiser-page-input-container username">
            <label>Псевдоним/ФИО:</label>
            <input
              className='register-page-input username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="regiser-page-input-container email">
            <label>Почта:</label>
            <input
              className='register-page-input email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-page-input-container password">
            <label>Пароль:</label>
            <input
              className='register-page-input password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="regiser-page-input-container phone">
            <label>Почта:</label>
            <input
              className='register-page-input phone'
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        

        <div className="regiser-page-image-info-container">
          <label>Как будет выглядеть в кабинете:</label>

          <label>Изображение:</label>
            <input
              className='register-page-input image'
              type="file"
              accept="image/*"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
        </div>

        <button type="submit" disabled={isSubmitting} className="register-page-submit-button">
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>

    </div>
  );
}

export default RegisterPage;