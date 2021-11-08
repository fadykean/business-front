import React, { useEffect, useState } from 'react';
import cardService from '../services/cardService';
import { Button } from 'react-bootstrap';
import '../css/filter.css';
function Filter({ onFilter, user }) {
  const [filterBy, setFilterBy] = useState({
    name: '',
    sort: 'low to high',
    category: 'all',
    show: 'all',
  });
  const [toggle, setToggle] = useState({
    show: false,
    sort: false,
    category: false,
  });

  const categories = cardService.categories;
  useEffect(() => {
    onFilter(filterBy);
  }, [filterBy]);

  const handleChange = ({ target }) => {
    const field = target.name;
    const { value } = target;
    setFilterBy({ ...filterBy, [field]: value });
  };

  const setFilter = (field, value) => {
    setFilterBy({ ...filterBy, [field]: value });
  };

  return (
    <div className='filter'>
      <input
        className='select '
        name='name'
        onChange={handleChange}
        value={filterBy.name}
        placeholder='enter business name'
      />

      <div className='select'>
        <Button onClick={() => setToggle({ ...toggle, show: !toggle.show })}>
          {filterBy.show}
        </Button>
        {toggle.show && (
          <ul className='list'>
            <li className='opt' onClick={() => setFilter('show', 'all')}>
              all cards
            </li>
            {user?.biz && (
              <li className='opt' onClick={() => setFilter('show', 'mine')}>
                {' '}
                my cards
              </li>
            )}
            {!user?.biz && (
              <li className='opt' onClick={() => setFilter('show', 'favorite')}>
                favorite cards
              </li>
            )}
          </ul>
        )}
      </div>
      <div className='select'>
        <Button onClick={() => setToggle({ ...toggle, sort: !toggle.sort })}>
          {filterBy.sort}
        </Button>
        {toggle.sort && (
          <ul className='list'>
            <li className='opt' onClick={() => setFilter('sort', 'asc')}>
              low to high
            </li>
            <li className='opt' onClick={() => setFilter('sort', 'desc')}>
              high to low
            </li>
          </ul>
        )}
      </div>
      <div className='select'>
        <Button
          onClick={() => setToggle({ ...toggle, category: !toggle.category })}
        >
          {filterBy.category}
        </Button>
        {toggle.category && (
          <ul className='list'>
            {categories.map((c) => {
              return (
                <li
                  className='opt'
                  key={c}
                  onClick={() => setFilter('category', c)}
                >
                  {c}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Filter;
