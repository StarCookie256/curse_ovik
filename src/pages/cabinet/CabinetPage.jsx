import './CabinetPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useState, useEffect } from 'react';
import { API_IMAGE_PATH } from '../../api/config';

function CabinetPage(){
  const {user, refreshProfile, checkAuth} = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        await checkAuth;
        await refreshProfile();
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [checkAuth,refreshProfile]);

  if(loading){
    return(
      <div className='loading-data'>Работа с данными, пожалуйста, подождите...</div>
    );
  }
  console.log(user);
  return(
    <div className='cabinet-page-container'>
      <div className='cabinet-page-elements-container'>

        <div className='cabinet-page-info-container'>

          <div className='cabinet-page-top-info-container'>
            <div className='cabinet-page-image-container'>
              <img
                className='cabinet-page-image'
                src={`${API_IMAGE_PATH}${user.image}`}
                alt="IMG"
              />
            </div>
            <div className='cabinet-page-top-info'>
              <p className='cabinet-page-text'>{user.name}</p>
              <p className='cabinet-page-text'>Электронная почта: {user.email}</p>
            </div>
          </div>
          <div className='cabinet-page-other-info-container'>
            <p className='cabinet-page-text'>Телефон: {user.phone}</p>
            <p className='cabinet-page-text'>Адрес: {user.address}</p>
          </div>

        </div>

        <div className='cabinet-page-adress-picker-container'>
          <div className='cabinet-page-map'>
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Acef6bebaab6125e71087c46125ed0750e2e25e45c012bf382536d6742ccbc0a1&amp;source=constructor"
              className="yandex-map-iframe"
              title="Яндекс Карта"
              allowFullScreen
            ></iframe>
          </div>
          <div className='cabinet-page-adress-picker'>
            <p className='cabinet-page-text'>Выбранный адрес: Адрес</p>
            <button className='cabinet-page-button adress'>Выбрать</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinetPage;