import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { choosePlaylist, setPlaylists } from "../../store/actions/playlists";
import Button from "../Button/Button";

class GameOver extends Component {
  componentDidMount() {
    const { dots, history } = this.props;
    if (dots.length < 20) {
      history.push("/");
    }
  }

  render() {
    const { dots } = this.props;
    console.log(dots);
    const title =
      dots > 5
        ? dots > 10
          ? dots > 15
            ? dots > 19
              ? "Прекрасно"
              : "Отлично!"
            : "Хорошо!"
          : "Неплохо!"
        : "Попробуй еще раз!";

    return (
      <div>
        <h2 className="heading center-xs mt50">{title}</h2>
        <div className="center-xs mt50">
          <p className="para text-center">
            Угадано {dots.filter(dot => dot).length} из {dots.length} треков
          </p>
        </div>
        <div className="col-xs-8 col-xs-offset-2 col-md-6 col-md-offset-3 center-xs mt50">
          <a href="/">
            <Button artist="Сыграть еще раз" theme="landing" />
          </a>
          <a href="/form" className="mt50">
            <Button artist="Дать фидбэк" theme="landing" />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  dots: state.progressBar.dots,
}))(withRouter(GameOver));
