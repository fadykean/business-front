import React, { Component } from 'react';
import PageHeader from './common/pageHeader';

class About extends Component {
  state = {};
  render() {
    return (
      <div className='container'>
        <PageHeader titleText='About Real App'></PageHeader>
        <div className='row'>
          <div className='col-12'>
            Email: fady.alkean@gmail.com Phone: 0548389174 Full Stack developer
          </div>
        </div>
      </div>
    );
  }
}

export default About;
