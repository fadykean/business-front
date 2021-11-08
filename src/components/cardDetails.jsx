import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import cardService from '../services/cardService';
import '../css/cardDetails.css';
function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState();
  useEffect(() => {
    console.log({ id });
    getCard();
  }, []);

  async function getCard() {
    const res = await cardService.getCard(id);
    console.log(res.data);
    setCard(res.data);
  }
  return (
    <div className='card-details'>
      {card && (
        <div className='card-info'>
          <div className='card-left'>
            <h2>{card.bizName}</h2>
            <div>
              <span className='bold'> description:</span>
              <p>{card.bizDescription}</p>
            </div>
            <div>
              <span className='bold'>business number:</span>
              <span> {card.bizNumber}</span>
            </div>
            <div>
              <span className='bold'>business phone:</span>
              <span>{card.bizPhone}</span>
            </div>
            <div>
              <span className='bold'>business category</span>
              <span>{card.category}</span>
            </div>
            <div>
              <span className='bold'>business rate:</span>
              <span>{card.rate}</span>
            </div>
          </div>
          <img src={card.bizImage} alt='image' />
        </div>
      )}
    </div>
  );
}

export default CardDetails;
