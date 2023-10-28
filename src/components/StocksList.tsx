import React from 'react';
import '../styles/StocksList.css';


type PickedStockProps = {
  name: string;
  pickedStocks: string[];
  setPickedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStock: React.Dispatch<React.SetStateAction<string>>;
}

const PickedStock: React.FC<PickedStockProps> = ({
  name, pickedStocks, setPickedStocks, setCurrentStock
}) => {

  function deleteStock(name: string) {
    setPickedStocks(pickedStocks.filter(stock => stock !== name));
  }

  return (
    <li className='picked-stock'>
      <div className='deletable-stock'>
        <button className='stock-name' onClick={() => setCurrentStock(name)}>
          {name}
        </button>
        <button className='delete-stock' onClick={() => deleteStock(name)}>
          <img src={process.env.PUBLIC_URL + '/images/thrash.webp'} alt='thrash'/>
        </button>
      </div>
    </li>
  )
}


type Props = {
  pickedStocks: string[];
  setPickedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStock: React.Dispatch<React.SetStateAction<string>>;
}

const StocksList: React.FC<Props> = ({
  pickedStocks, setPickedStocks, setCurrentStock
}) => {
  return (
    <div className='stocks-list'>
      <div className='picked-stock'>
        <button className='stock-name' onClick={() => setCurrentStock("NEWS")}>
          NEWS
        </button>
      </div>
      <ul className='slider'>
        {pickedStocks.map(stock => <PickedStock
                                      name={stock}
                                      pickedStocks={pickedStocks}
                                      setPickedStocks={setPickedStocks}
                                      setCurrentStock={setCurrentStock}
                                      key={stock}
                                    />)}
      </ul>
    </div>
  )
}

export default StocksList;