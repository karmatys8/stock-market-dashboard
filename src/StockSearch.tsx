import React, { useEffect, useState } from 'react';
import './StockSearch.css';
import useDebounce from './useDebounce';


type StockProps = {
  symbol: string,
  pickedStocks: string[];
  setPickedStocks: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchedStock: React.FC<StockProps> = ({
  symbol, pickedStocks, setPickedStocks
}) => {
  return (
    <button
      className='searched-stock-button'
      onClick={() => setPickedStocks([...pickedStocks, symbol])
    }>
      {symbol}
    </button>
  )
}


type Props = {
  pickedStocks: string[];
  setPickedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}


const StockSearch: React.FC<Props> = ({
  pickedStocks, setPickedStocks, searchInput, setSearchInput
}) => {
  const finnhub = require('finnhub');

  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  
  const debouncedValue = useDebounce(searchInput, 500);
  const _handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    
    setSearchInput(newVal);
  }

  interface Stock {
    "descripiton": string,
    "displaySymbol": string,
    "symbol": string,
    "type": string
  }

  interface Provider {
    "count": number,
    "result": Stock[]
  }


  const [stocksToShow, setStocksToShow] = useState<Provider>({
    "count": 0,
    "result": []
  });

  useEffect(() => {
    if (debouncedValue){ // prevent empty string request
      finnhubClient.symbolSearch(debouncedValue, (error: any, data: Provider, response: any) => {
      if (data.count > 10) { // idk if it is not slowing the app a lot
        data.count = 10;
        let withoutExcess = Array.from(data.result).slice(0, 10);
        data.result = withoutExcess;
      }

      setStocksToShow(data)
      })
    } else { // reset results after clearing the search bar
      setStocksToShow({
        "count": 0,
        "result": []
      });
    }
  }, [debouncedValue])


  return (
    <form className='search-form' onSubmit={(event) => event.preventDefault()}>
      <div className='fluid-row'>
        <div className='fluid-row-content'>
          {
          stocksToShow.result.map(stock =>
          <SearchedStock
            symbol={stock.symbol}
            pickedStocks={pickedStocks}
            setPickedStocks={setPickedStocks} 
            key={stock.symbol}
          />)
          }
        </div>
      </div>
      <label>
        Search for stocks:<br/>
        <input className='search-input' type="text" placeholder='fe. "AAPL", "USD"' onChange={_handler}/>
      </label>
    </form>
  )
}

export default StockSearch;