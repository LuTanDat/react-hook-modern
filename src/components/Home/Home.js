import videoHomePage from '../../assets/video-homepage.mp4'

const Home = (props) => {
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
          <button className='btn-title-3'>Get started. It's free</button>
        </div>
      </div>
    </div>
  )
}

export default Home;