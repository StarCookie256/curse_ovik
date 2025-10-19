import { Link } from 'react-router-dom';
import './perfumeryFooter.css';

function PerfumeryFooter(){
  const feedbackOptions = [
    {path: 'https://t.me/StarCookie256', icon: '/perfumery-telegram-var-two.png', name:'telegram'},
    {path: 'mailto:sopov.cookie@gmail.com', icon: '/perfumery-gmail-var-one.png', name:'e-mail'}
  ]

  return(
    <div className='perfumeryFooter-container'>
      <div className='perfumeryFooter-info'>
        Copyright 2025–2025 © StarCookie-Perfumery.ru — Интернет-магазин парфюмерии и косметики<br/>
        Все права защищены. Доставка по Москве, Санкт-Петербургу и другим городам России.<br/>
        Телефоны в Москве: +7 XXX XXX XX-XX, в Санкт-Петербурге: +7 XXX XXX XX-XX,<br/>
        по России (бесплатно): 8 XXX XXX XX-XX
      </div>

      <div className='perfumeryFooter-feedback-container'>
        <p className='perfumeryFooter-feedback-text'>Обратная связь:</p>
        <div className='perfumeryFooter-feedback-icons-container'>
          {
            feedbackOptions.map((feedback) =>(
                <Link
                    key = {feedback.path}
                    to = {feedback.path}
                    className='perfumeryFooter-feedback-link'
                >
                    <img className={`perfumeryFooter-feedback-icon ${feedback.name}`} src={feedback.icon} alt={feedback.name}/>
                </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerfumeryFooter;