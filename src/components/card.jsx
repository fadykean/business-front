import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development';
import GoldenStar from '../assets/imgs/golden-star.png';
import Star from '../assets/imgs/star.png';
import Business from '../assets/imgs/business.png';

import '../css/card.css';
const Card = ({ card, deleteCard, toggleLike, user }) => {
  useEffect(() => {}, []);
  const [isLike, setIsLike] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      setIsLike(false);
      user.favCards.forEach((c) => {
        if (c._id === card._id) {
          setIsLike(true);
        }
      });
    }
  }, [user]);

  function editCard(ev) {
    ev.stopPropagation();
    history.push(`/my-cards/edit/${card._id}`);
  }

  return (
    <div
      className='col-md-6 col-lg-4 mt-3'
      onClick={(ev) => history.push(`/card/${card._id}`)}
    >
      <div className='card'>
        <div className='card-header'>
          <img
            src={card.bizImage || Business}
            width='100'
            alt={card.bizName}
            className='business-icon'
          />
          {!user.biz && isLike && (
            <img
              onClick={(ev) => toggleLike(ev, false, card)}
              src={GoldenStar}
              alt='like'
              className='star-icon'
            />
          )}
          {!user.biz && !isLike && (
            <img
              onClick={(ev) => toggleLike(ev, true, card)}
              src={Star}
              alt='not like'
              className='star-icon'
            />
          )}
        </div>
        <div className='card-body'>
          <h5 className='card-title'>{card.bizName}</h5>
          <p className='card-text'>{card.bizDescription}</p>
          <div className='category'>
            <Form.Label className='me-sm-2'>category: </Form.Label>
            <span>{card.category}</span>
          </div>
          <Form.Label htmlFor=''>rate: {card.rate}</Form.Label>

          <p className='card-text border-top pt-2'>
            <Form.Label>phone:</Form.Label>
            <span> {card.bizPhone}</span>
            <br />b<Form.Label>address:</Form.Label>
            <span> {card.bizAddress}</span>
          </p>
          {user._id === card.user_id && (
            <div className='btns'>
              <Button variant='primary' onClick={(ev) => editCard(ev)}>
                Edit
              </Button>
              <Button
                variant='primary'
                onClick={(ev) => deleteCard(ev, card._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
