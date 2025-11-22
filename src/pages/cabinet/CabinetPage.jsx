import './CabinetPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useState, useEffect } from 'react';
import { API_IMAGE_PATH } from '../../api/config';

function CabinetPage(){
  const {user, refreshProfile} = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        await refreshProfile();
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [refreshProfile]);

  if(loading){
    return(
      <div className='cabinet-page-container'>
        Загрузка...
      </div>
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
            заглушка карты яндекс
          </div>
          <div className='cabinet-page-adress-picker'>
            <p className='cabinet-page-text'>Выбранный адрес: улица пупупупууушкина 42, д.42</p>
            <button className='cabinet-page-button adress'>Выбрать</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinetPage;