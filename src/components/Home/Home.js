import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4'
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next'; // import


const Home = (props) => {
  const { t } = useTranslation(); // use hook
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video loop muted autoPlay>
        <source
          src={videoHomePage}
          type="video/mp4"
        />
      </video>
      <div className='homepage-content'>
        <div className='title-1'> {t('homepage.title1')}</div>
        <div className='title-2'>{t('homepage.title2')}</div>
        <div className='title-3'>
          {isAuthenticated === false ?
            <button className='btn-title-3' onClick={() => { navigate('/login') }}>{t('homepage.title3.login')}</button>
            :
            <button className='btn-title-3' onClick={() => { navigate('/users') }}>{t('homepage.title3.doing')}</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home;