import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { clearProgress } from '../../store/actions/progress';
import Button from '../Button/Button';

class GameOver extends Component {
  componentDidMount() {
    const { dots, history } = this.props;
    if (dots.length < 20) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    const { clearProgress } = this.props;
    clearProgress();
  }

  render() {
    const { dots } = this.props;
    const title =
      dots.length > 5
        ? dots.length > 10
          ? dots.length > 15
            ? dots.length > 19
              ? 'Великолепно!'
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
          <Link to="/game">
            <Button artist="Сыграть еще раз" theme="landing" />
          </Link>
          <Link to="/form">
            <Button
              artist="Бонус-игра"
              theme="form"
              style={{ marginTop: 20 }}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    dots: state.progressBar.dots,
  }),
  { clearProgress }
)(withRouter(GameOver));
