import './CabinetPage.css';
import { useAuth } from '../../components/context/AuthContext';
import { useState, useEffect } from 'react';

function CabinetPage(){
  const {user, logout, refreshProfile} = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      await refreshProfile();
      const data = user;
      console.log(user);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const exit = () => {
    logout();
  }

  if(loading){
    return(
      <div className='cabinet-page-container'>
        Загрузка...
      </div>
    );
  }
  
  return(
    <div className='cabinet-page-container'>
      <div className='cabinet-page-elements-container'>

        <div className='cabinet-page-info-container'>

          <div className='cabinet-page-top-info-container'>
            <div className='cabinet-page-image-container'>
              <img
                className='cabinet-page-image'
                src={userData.image}
                alt="IMG"
              />
            </div>
            <div className='cabinet-page-top-info'>
              <p className='cabinet-page-text'>{userData.name}</p>
              <p className='cabinet-page-text'>Электронная почта: {userData.email}</p>
            </div>
          </div>
          <div className='cabinet-page-other-info-container'>
            <p className='cabinet-page-text'>Телефон: {userData.phone}</p>
            <p className='cabinet-page-text'>Адрес: {userData.address}</p>
            <button className='cabinet-page-button exit' onClick={exit}>Выйти из аккаунта</button>
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