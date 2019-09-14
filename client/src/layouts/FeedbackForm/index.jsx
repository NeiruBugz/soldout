import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from '../../helpers/axios';

import Button from '../../components/Button/Button';

import './styles.scss';
import { choosePlaylist } from '../../store/actions/playlists';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      playlists: '',
      bugs: '',
    };

    this.BONUS_PLAYLSIT_ID = 6538306484;
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { choosePlaylist, history } = this.props;
    let data = this.state;
    axios.post('/reviews', { ...data }).then(() => {
      choosePlaylist(this.BONUS_PLAYLSIT_ID);
      history.push('/game');
    });
  };

  onRangeChange = e => {
    this.setState({
      score: e.target.value,
    });
  };

  onGenresChange = e => {
    this.setState({ playlists: e.target.value });
  };

  onBugsChange = e => {
    this.setState({ bugs: e.target.value });
  };

  render() {
    let { score } = this.state;
    return (
      <section className="form-layout">
        <>
          <h1 className="form-layout__title">Помоги сделать сервис лучше</h1>
          <p className="form-layout__subtitle">опрос займет 1 минуту</p>
        </>
        <form className="form" onSubmit={this.onFormSubmit}>
          <>
            <label htmlFor="like-range">Тебе понравилось?</label>
            <input
              type="range"
              id="like-range"
              min="0"
              max="10"
              step="1"
              value={score}
              onChange={this.onRangeChange}
              required
            />
          </>
          <>
            <label htmlFor="missing-input">
              Каких жанров/плейлистов не хватает?
            </label>
            <input
              type="text"
              id="missing-input"
              placeholder="Напиши что-нибудь"
              onChange={this.onGenresChange}
              required
            />
          </>
          <>
            <label htmlFor="bug-report">
              Ошибки, баги и предложения. Напиши тут{' '}
              <span role="img" aria-label="love-emoji">
                ❤️
              </span>
            </label>
            <input
              type="text"
              id="bug-report"
              placeholder="Напиши что-нибудь"
              onChange={this.onBugsChange}
              required
            />
          </>
          <Button
            artist="Отправить и получить бонусный раунд"
            type="submit"
            theme="form"
          />
        </form>
      </section>
    );
  }
}

export default connect(
  null,
  { choosePlaylist }
)(withRouter(FeedbackForm));
