/* eslint-disable react/no-string-refs,react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setPlaying } from '../../store/actions/game';
import StartMessage from './StartMessage';
import Visualizer from './Visualizer';

interface AudioComponentProps {
  musicUrl: any;
  setPlaying: (flag) => {};
  isPlaying: boolean;
}

class AudioComponent extends React.Component<AudioComponentProps, {}> {
  timer: number = 0;
  audio = new Audio();

  constructor(props) {
    super(props);

    this.audio.crossOrigin = 'anonymous';
  }

  componentDidUpdate(prevProps) {
    const { musicUrl } = this.props;
    this.stop();
    if (musicUrl) {
      this.audio.src = this.props.musicUrl;
      this.audio.oncanplaythrough = this.play;
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  stop = () => {
    clearTimeout(this.timer);
    this.audio.currentTime = 0;
    this.audio.pause();
  };
  play = () => {
    const { setPlaying } = this.props;
    this.audio.oncanplaythrough = null;
    if (this.audio) {
      this.audio
        .play()
        .then(() => {
          setPlaying(true);
          this.timer = +setTimeout(() => this.stop(), 10000);
        })
        .catch(() => setPlaying(false));
    }
  };

  render() {
    const { isPlaying } = this.props;
    return isPlaying ? <Visualizer /> : <StartMessage btnAction={this.play} />;
  }
}

export default withRouter(
  connect(state => ({ isPlaying: state.game.isPlaying }), { setPlaying })(
    AudioComponent
  )
);
