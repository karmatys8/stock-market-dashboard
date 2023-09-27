import React from 'react';
import './Card.css';

type Props = {
  cardName: string;
}

const Card: React.FC<Props> = ({
  cardName,
}) => {
 return (
  <div className='card'>
    <span className='card-name'>{cardName}</span>
    <div className='card-context'></div>
  </div>
 )
}

export default Card;