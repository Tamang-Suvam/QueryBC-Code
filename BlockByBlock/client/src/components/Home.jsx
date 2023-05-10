import React from 'react'
import { useNavigate } from 'react-router-dom';
import MyVideo from '../assets/BackgroundVideo.mp4'
import ethereum from '../assets/ethereum.jpg';
import ipfs from '../assets/ipfs.jpeg';
import mongoDB from '../assets/mongoDB.webp';
import react from '../assets/react.png';
import solidity from '../assets/solidity.png';
// import sample from '.././assets/EHR.jpg';
import '../App.css';

export const Home = () => {
  const navigate = useNavigate();
  const handleClick = event => {
    event.preventDefault();
    navigate("/start_page")
  }
  return (
    <div className='video-header'>
      <video src={MyVideo} type="video/mp4" autoPlay loop playsInline muted></video>
      
      <div className="viewport-header">
        
        <div>
            <p className='header1'>
              Welcome to
              <p className='span'>QEHR 👋</p>
            </p>
            <p>&nbsp;</p>
            <h2 className='text-success display-1'>Hey! Thank You for choosing QEHR.</h2>
            <h3 className='display-2' style={{ color: 'red' }}>Key Features</h3>
              <ol style={{ listStyle: 'none' }}>
                <li className='fs-2 text-success'>It is a Blockchain powered application</li>
                <li className='fs-2 text-success'>A Blockchain application with query features</li>
                <li className='fs-2 text-success'>Efficient and faster Healthcare support, highly secure through decentralization</li>
                <li className='fs-2 text-success'>No need to carry your medical records everywhere</li>
              </ol>
              <div className='text-center'>
                  <button type="button" className="btn btn-success fs-2 px-5" onClick={handleClick}>Get Me In</button>
                  <p>&nbsp;</p>
                  <h4>Powered By</h4>
                  <div className='text-center'>
                  <img src={solidity} alt="solidity" style={{width: '1.9%', borderRadius: '50%', marginRight: '7px'}} />
                  <img src={ethereum} alt="ethereum" style={{width: '2%', borderRadius: '50%', marginRight: '7px'}}/>
                  <img src={ipfs} alt="ipfs" style={{width: '2%', borderRadius: '50%', marginRight: '7px'}}/>
                  <img src={mongoDB} alt="mongoDB" style={{width: '2%', borderRadius: '50%', marginRight: '7px'}}/>
                  <img src={react} alt="react" style={{width: '2%', borderRadius: '50%', marginRight: '7px'}}/>
                  </div>
              </div>
        </div>
      
      </div>
    
    </div>
  )
}

export default Home;
