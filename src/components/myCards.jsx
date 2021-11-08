import { Component } from 'react';
import { Button } from 'react-bootstrap';
import cardService from '../services/cardService';
import PageHeader from './common/pageHeader';
import Card from './card';
import Filter from './filter';
import userService from '../services/userService';
import '../css/myCards.css';
class MyCards extends Component {
  state = {
    allCards: [],
    cards: [],
    user: null,
    filterBy: {},
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    const user = userService.getCurrentUser();
    this.setState({ user });
    if (data.length) {
      this.setState({ allCards: data });
    }
  }

  deleteCard = async (ev, cardId) => {
    ev.stopPropagation();
    await cardService.deleteCard(cardId, this.state.user._id);
    const { data } = await cardService.getMyCards();
    this.setState({ cards: data });
  };

  onFilter = (filterBy) => {
    this.setState({ filterBy });
    let copy = [...this.state.allCards];
    if (filterBy.name) {
      copy = copy.filter((card) => card.bizName.includes(filterBy.name));
    }
    if (filterBy.show === 'mine') {
      copy = copy.filter((card) => card.user_id === this.state.user._id);
    } else if (filterBy.show === 'favorite') {
      const ids = this.state.user?.favCards.map((c) => c._id);
      copy = copy.filter((card) => ids.includes(card._id));
    }
    if (filterBy.sort === 'asc') {
      copy.sort((a, b) => (a.rate > b.rate ? 1 : -1));
    } else {
      copy.sort((a, b) => (a.rate < b.rate ? 1 : -1));
    }
    if (filterBy.category !== 'all') {
      copy = copy.filter((card) => card.category === filterBy.category);
    }
    this.setState({ cards: copy });
  };

  toggleLike = async (ev, isLike, card) => {
    ev.stopPropagation();
    const copyUser = { ...this.state.user };
    if (!copyUser) return;
    if (!isLike) {
      const index = copyUser.favCards.findIndex((i) => i._id === card._id);
      copyUser.favCards.splice(index, 1);
    } else {
      copyUser.favCards.push(card);
    }
    await userService.updateUser(copyUser);
    this.setState({ user: copyUser });
    this.onFilter(this.state.filterBy);
  };

  render() {
    const {
      state: { cards },
    } = this;

    return (
      <div className='container myCards'>
        <PageHeader titleText='My Cards Page' />

        {!!this.state.allCards.length && (
          <Filter
            onFilter={this.onFilter}
            user={this.state.user ? this.state.user : null}
          />
        )}
        <div className='row'>
          <div className='col-12'>
            {!this.state.allCards.length && <p>There is no cards yet</p>}
            {!!this.state.allCards.length && (
              <p>Your Cards in the list below...</p>
            )}
          </div>
        </div>
        <div className='row'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              deleteCard={this.deleteCard}
              toggleLike={this.toggleLike}
              user={this.state.user ? this.state.user : null}
            />
          ))}
        </div>
        {this.state.user?.biz && (
          <Button
            className='create-btn'
            onClick={() => this.props.history.push('/create-card')}
          >
            create card
          </Button>
        )}
      </div>
    );
  }
}

export default MyCards;
