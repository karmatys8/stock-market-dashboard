import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import NewsSlideshow from './NewsSlideShow';
import StockInfo from './StockInfo';

type Props = {
  name: string;
}

const PickedStock: React.FC<Props> = ({
  name,
}) => {
  return (
    <li className='picked-stock'>
      <button>
        {name}
      </button>
    </li>
  )
}


function App() {
  const [pickedStocks, setPickedStocks] = useState(["NEWS"]);
  const [currentStock, setCurrentStock] = useState("NEWS");
  const searchInput = useRef(null);

  return (
    <div className="App">
      <button className='back-to-top-button' onClick={() => window.scrollTo(0, 0)}>
        <img className='back-to-top' src={process.env.PUBLIC_URL + '/images/arrowUp.png'} alt="arrow up"/>
      </button>
      <div className='site-content'>
        <div className='stocks-list'>
          <ul className='slider'>
            {pickedStocks.map(stock => <PickedStock name={stock} key='stock'/>)}
          </ul>
        </div>
        <div className='search-form-container'>
          <form className='search-form' onSubmit={e => console.log(e)}>
            <div className='fluid-row'>
              <div className='fluid-row-content'>
                {/* stocks' names */}
              </div>
            </div>
            <label>
              Search for stocks:<br/>
              <input className='search-input' type="text" placeholder='fe. "AAPL", "USD"' ref={searchInput}/>
            </label>
            <button className='submit-button' type='submit'>Submit</button>
          </form>
        </div>
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
