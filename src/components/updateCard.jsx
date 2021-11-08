import Form from './common/form';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';

class UpdateCard extends Form {
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
    _id: Joi.string(),
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(0).max(1024).required(),
    category: Joi.string().min(2).max(1024).required(),
    rate: Joi.number().min(0).max(5).required(),
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(card) {
    return {
      _id: card._id,
      bizName: card.bizName,
      bizDescription: card.bizDescription,
      bizAddress: card.bizAddress,
      bizPhone: card.bizPhone,
      bizImage: card.bizImage,
      category: card.category,
      rate: card.rate,
    };
  }

  doSubmit = async () => {
    const {
      state: { data },
    } = this;
    if (!data.bizImage) delete data.bizImage;
    await cardService.editCard(data);
    toast('Card Is Updated');
    this.props.history.replace('/my-cards');
  };
  handleCancel = () => {
    this.props.history.push('/my-cards');
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
              {this.renderInput('bizPhone', 'Business Phone')}
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
              {this.renderInput('bizImage', 'Business Image')}
              {this.renderButton('Update Card')}
              <button
                className='btn btn-secondary ml-2'
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCard;
