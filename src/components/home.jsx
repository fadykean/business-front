import React, { Component } from 'react';
import PageHeader from './common/pageHeader';

class Home extends Component {
  state = {};
  render() {
    return (
      <div className='container'>
        <PageHeader titleText='Real App Home Page'></PageHeader>
        <div className='row'>
          <div className='col-12'>
            An application that will serve business people and their customers.
            Every businessman will advertise his business. Businesses will be
            sorted by categories. Regular customers will search by categories
            and receive appropriate service. A regular customer will be able to
            add to his favorites businesses that he has already viewed. A
            business owner can add more than one card. A business owner will
            also have the option to update, delete, and view other businesses.
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
