import React, {useEffect, useState, useRef} from 'react';
import '../styles/App.css';
import NewsSlideshow from './NewsSlideShow';
import StockInfo from './StockInfo';
import StockSearch from './StockSearch';
import StocksList from './StocksList';


function App() {
  const [pickedStocks, setPickedStocks] = useState<string[]>([]);
  const [currentStock, setCurrentStock] = useState<string>("NEWS");


  useEffect(() => {
    const followedStocks = window.localStorage.getItem("pickedStocks");
    followedStocks && setPickedStocks(JSON.parse(followedStocks));
  }, [])


  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      window.localStorage.setItem("pickedStocks", JSON.stringify(pickedStocks));
    }
    
  },
  [pickedStocks])


  return (
    <div className="App">
      <button className='back-to-top-button' onClick={() => window.scrollTo(0, 0)}>
        <img className='back-to-top' src={process.env.PUBLIC_URL + '/images/arrowUp.png'} alt="arrow up"/>
      </button>
      <div className='site-content'>
      <StocksList pickedStocks={pickedStocks} setPickedStocks={setPickedStocks} setCurrentStock={setCurrentStock}/>
        <StockSearch
          pickedStocks={pickedStocks}
          setPickedStocks={setPickedStocks}
        />
        {
          currentStock === "NEWS" ? <NewsSlideshow/> : <StockInfo/>
        }
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
