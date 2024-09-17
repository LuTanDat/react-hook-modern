import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
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
        <div className='title-1'>Make forms worth filling out</div>
        <div className='title-2'>Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different.</div>
        <div className='title-3'>
          {isAuthenticated === false ?
            <button className='btn-title-3' onClick={() => { navigate('/login') }}>Get started. It's free</button>
            :
            <button className='btn-title-3' onClick={() => { navigate('/users') }}>Welcome back, Doing Quiz Now</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home;