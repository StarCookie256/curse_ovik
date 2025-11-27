import { useState } from 'react';
import './RegisterPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router';

function validateValues(username, email, password, phone, image, setRegError, setIsSubmitting){
  setIsSubmitting(true);

  if (!image) {
    alert('Пожалуйста, выберите изображение');
    return;
  }

  if (!username || username.trim() === '') {
    setRegError('Поле "Псевдоним/ФИО" не заполнено!');
    setIsSubmitting(false);
    return false;
  } else if (username.trim().length < 2) {
    setRegError('Псевдоним/ФИО должен содержать минимум 2 символа');
    setIsSubmitting(false);
    return false;
  } else if (username.trim().length > 42) {
    setRegError('Псевдоним/ФИО не должен превышать 42 символа');
    setIsSubmitting(false);
    return false;
  }

  if (!email || email.trim() === '') {
    setRegError('Поле "Почта" не заполнено!');
    setIsSubmitting(false);
    return false;
  } else if (!isValidEmail(email)) {
    setRegError('Введите корректный email адрес');
    setIsSubmitting(false);
    return false;
  }

  if (!password || password.trim() === '') {
    setRegError('Поле "Пароль" не заполнено!');
    setIsSubmitting(false);
    return false;
  } else if (password.length < 6) {
    setRegError('Пароль должен содержать минимум 6 символов');
    setIsSubmitting(false);
    return false;
  } else if (password.length > 50) {
    setRegError('Пароль не должен превышать 42 символа');
    setIsSubmitting(false);
    return false;
  } else if (!isStrongPassword(password)) {
    setRegError('Пароль должен содержать буквы и цифры');
    setIsSubmitting(false);
    return false;
  }

  if (!phone || phone.trim() === '') {
    setRegError('Поле "Телефонный номер" не заполнено!');
    setIsSubmitting(false);
    return false;
  } else if (!isValidPhone(phone)) {
    setRegError('Введите корректный номер телефона');
    setIsSubmitting(false);
    return false;
  }
  
  return true;
}

// Вспомогательные функции валидации
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isStrongPassword(password) {
  // Минимум 1 буква и 1 цифра
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
}

function isValidPhone(phone) {
  // Убираем все нецифровые символы для проверки
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Проверяем длину (пример для российских номеров: 11 цифр)
  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    return false;
  }
  
  // Дополнительные проверки формата телефона
  const phoneRegex = /^[+]?[0-9\s\-()]+$/;
  return phoneRegex.test(phone);
}

function RegisterPage(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regError, setRegError] = useState(null);

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
    setRegError(null);
    e.preventDefault();
    
    if (!validateValues(username, email, password, phone, image, setRegError, setIsSubmitting)) 
      return;

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
      setRegError(error);
      // ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
    <div className='register-page-container'>
      <h2 className='register-page-title'>Регистрация</h2>

      <form 
        className='register-page-form'
        onSubmit={handleSubmit}
      >
        <div className='register-page-reg-part-container'>

          <div className='register-page-general-info'>
            <div className="register-page-input-container username">
              <label>Псевдоним/ФИО:</label>
              <input
                className='register-page-input username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="register-page-input-container email">
              <label>Почта:</label>
              <input
                className='register-page-input email'
                type="email"
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

            <div className="register-page-input-container phone">
              <label>Телефонный номер:</label>
              <input
                className='register-page-input phone'
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {regError && <div className="register-page-error">{regError}</div>}
          </div>

          <div className="register-page-image-info-container">

            <label>Как будет выглядеть в кабинете:</label>
            <div className='register-page-image-preview'>
              {imagePreview && (
                <div className='cabinet-page-image-container'>
                  <img
                    className='cabinet-page-image'
                    src={imagePreview}
                    alt="IMG"
                  />
                </div>
              )}
            </div>

            <label>Выбрать изображение:</label>
              <input
                disabled={isSubmitting}
                className='register-page-input image'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="register-page-submit-button">
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

    </div>
  );
}

export default RegisterPage;