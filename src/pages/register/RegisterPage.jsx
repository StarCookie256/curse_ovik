import { useState } from 'react';
import './RegisterPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterPage(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {register: reg, error} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Обработчик для загрузки изображения с FileReader
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      
      reader.onerror = () => {
        console.error('Ошибка чтения файла');
        setImagePreview(null);
      };
      
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Базовая валидация
    if (!image) {
      alert('Пожалуйста, выберите изображение');
      return;
    }
    
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('Username', username);
    formDataToSend.append('Email', email);
    formDataToSend.append('Password', password);
    formDataToSend.append('Phone', phone);
    formDataToSend.append('Image', image);

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
            <label>Телефонный номер:</label>
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
            {imagePreview && (
              <div className='cabinet-page-image-container'>
                <img
                  className='cabinet-page-image'
                  src={imagePreview}
                  alt="IMG"
                />
              </div>
            )}

          <label>Выбрать изображение:</label>
            <input
              className='register-page-input image'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
        </div>

        <button type="submit" disabled={isSubmitting} className="register-page-submit-button">
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

    </div>
  );
}

export default RegisterPage;