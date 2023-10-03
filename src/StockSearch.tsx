import React, { useEffect, useState } from 'react';
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
    <>
    </>
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
    finnhubClient.symbolSearch(searchInput, (error: any, data: Provider, response: any) => {
      setStocksToShow(data)
    })
  }, [searchInput])


  return (
    <div className='search-form-container'>
      <form className='search-form'>
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
        <button className='submit-button' type='submit'>Pick 1st</button>
      </form>
    </div>
  )
}

export default StockSearch;