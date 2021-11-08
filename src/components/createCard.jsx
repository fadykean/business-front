import Form from './common/form';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';
import Business from '../assets/imgs/business.png';

class CreateCard extends Form {
  state = {
    data: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizImage: '',
      category: '',
      rate: '',
    },
    errors: {},
    categories: cardService.categories,
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(0).max(1024).required().uri().allow(''),
    category: Joi.string().min(2).max(1024).required(),
    rate: Joi.number().min(0).max(5).required(),
  };

  doSubmit = async () => {
    const {
      state: { data },
    } = this;
    if (!data.bizImage) data.bizImage = Business;
    await cardService.createCard({ ...data, rate: Number(data.rate) });
    toast('A new Card is Opened');
    this.props.history.replace('/my-cards');
  };

  render() {
    return (
      <div className='container'>
        <PageHeader titleText='Business Registration Form'></PageHeader>
        <div className='row'>
          <div className='col-12'>
            <p>Open Business Card</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={this.handleSubmit} autoComplete='off' method='POST'>
              {this.renderInput('bizName', 'Business Name')}
              {this.renderInput('bizDescription', 'Business Description')}
              {this.renderInput('bizAddress', 'Business Address')}
              <select
                name='category'
                value={this.state.data.category}
                onChange={this.handleChange}
              >
                {this.state.categories.map((c) => {
                  return (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
              {this.renderInput('rate', 'Rate')}
              {this.renderInput('bizPhone', 'Business Phone')}
              {this.renderInput('bizImage', 'Business Image')}
              {this.renderButton('Create Card')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
