import './CabinetPage.css';
import { useAuth } from '../../components/context/AuthContext';

function CabinetPage(){
  const {logout} = useAuth();
  const exit = () => {
    logout();
  }

  return(
    <div>личный кабинет типо
      <button
        onClick={exit}
      >
        Выйди отсюда ирод
      </button>
    </div>
  );
}

export default CabinetPage;