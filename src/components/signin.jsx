import PageHeader from './common/pageHeader';
import Form from './common/form';
import Joi from 'joi-browser';

import userService from '../services/userService';
import { Redirect } from 'react-router-dom';

class Signin extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
    user: null,
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
  };

  doSubmit = async () => {
    console.log('doSubmit');
    const { email, password } = this.state.data;
    try {
      const user = await userService.login(email, password);
      console.log({ user });
      window.location = '/';
    } catch (ex) {
      if (ex.response?.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  async componentDidMount() {
    this.setState({ user: await userService.getCurrentUser() });
  }

  render() {
    if (this.state.user) return <Redirect to='/' />;

    return (
      <div className='container'>
        <PageHeader titleText='Signin for Real App'></PageHeader>
        <div className='row'>
          <div className='col-12'>
            <p>You can Sign In Here w/your account</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={this.handleSubmit} autoComplete='off' method='POST'>
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Submit')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
