import React, {useEffect, useState, useRef} from 'react';
import '../styles/App.css';
import NewsSlideshow from './NewsSlideShow';
import StockInfo from './StockInfo';
import StockSearch from './StockSearch';


type Props = {
  name: string;
  setCurrentStock: React.Dispatch<React.SetStateAction<string>>;
}

const PickedStock: React.FC<Props> = ({
  name, setCurrentStock
}) => {
  return (
    <li className='picked-stock'>
      <button onClick={() => setCurrentStock(name)}>
        {name}
      </button>
    </li>
  )
}


function App() {
  const [pickedStocks, setPickedStocks] = useState<string[]>(["NEWS"]);
  const [currentStock, setCurrentStock] = useState<string>("NEWS");

  return (
    <div className="App">
      <button className='back-to-top-button' onClick={() => window.scrollTo(0, 0)}>
        <img className='back-to-top' src={process.env.PUBLIC_URL + '/images/arrowUp.png'} alt="arrow up"/>
      </button>
      <div className='site-content'>
        <div className='stocks-list'>
          <ul className='slider'>
            {pickedStocks.map(stock => <PickedStock name={stock} setCurrentStock={setCurrentStock} key='stock'/>)}
          </ul>
        </div>
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
