import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { choosePlaylist, setPlaylists } from '../../store/actions/playlists';
import Button from '../Button/Button';

class GameOver extends Component {
  componentDidMount() {
    const { dots, history } = this.props;
    if (dots.length < 20) {
      history.push('/');
    }
  }

  onClick = () => {
    const { choosePlaylist, history } = this.props;
    choosePlaylist(this.BONUS_PLAYLSIT_ID);
    history.push('/game');
  };

  render() {
    const { dots } = this.props;
    const title =
      dots > 5
        ? dots > 10
          ? dots > 15
            ? dots > 19
              ? 'Прекрасно'
              : 'Отлично!'
            : 'Хорошо!'
          : 'Неплохо!'
        : 'Попробуй еще раз!';

    return (
      <div>
        <h2 className="heading center-xs mt50">{title}</h2>
        <div className="center-xs mt50">
          <p className="para text-center">
            Угадано {dots.filter(dot => dot).length} из {dots.length} треков
          </p>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 center-xs mt50">
          <Button artist={<a href="/">Сыграть еще раз</a>} theme="landing" />
          <Button artist="Бонус-игра" theme="form" style={{ marginTop: 20 }} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    dots: state.progressBar.dots,
  }),
  { choosePlaylist }
)(withRouter(GameOver));
