/* eslint-disable react/no-string-refs,react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setPlaying } from "../../store/actions/game";
import StartMessage from "./StartMessage";
import Visualizer from "./Visualizer";

class AudioComponent extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
  }

  componentDidUpdate(prevProps) {
    this.audio.currentTime = 0;
    this.audio.pause();
    const { musicUrl } = this.props;
    if (musicUrl) {
      this.audio.src = this.props.musicUrl;
      this.audio
        .play()
        .then(() => this.props.setPlaying(true))
        .catch(() => this.props.setPlaying(false));
    }
  }

  play = () => {
    if (this.audio) {
      this.audio.play().then(() => this.props.setPlaying(true));
    }
  };

  render() {
    const { isPlaying } = this.props;
    return isPlaying ? <Visualizer /> : <StartMessage btnAction={this.play} />;
  }
}

export default withRouter(
  connect(
    state => ({ isPlaying: state.game.isPlaying }),
    { setPlaying }
  )(AudioComponent)
);
