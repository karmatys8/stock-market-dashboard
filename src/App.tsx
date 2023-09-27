import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import Card from './Card'

function App() {
  const [pickedStocks, setPickedStocks] = useState(undefined);
  const [news, setNews] = useState(undefined);
  const [currentNewsPage, setCurrentNewsPage] = useState(undefined);
  const searchInput = useRef(undefined);

  useEffect(() => {
    //getting news
  })

  return (
    <div className="App">
      <div className='back-to-top-container'>
        <img className='back-to-top' src={process.env.PUBLIC_URL + '/images/arrowUp.png'} alt="arrow up"/>
      </div>
      <div className='site-content'>

      </div>
      <footer>
        <div className='credits-container'>
          <div className='credits-slide'>
            All of the data from: <img src={process.env.PUBLIC_URL + "/finnhub-logo-gradient-thumbnail-trans.png"} alt="Spotify logo"></img>
          </div>
          <div className='credits-slide'>
            <label>
              Made by: Armatys Konrad
              <br/>
              Check me on <a href='https://github.com/karmatys8' target="_blank" rel='noreferrer'>GitHub</a>
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
