import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setPlaying } from "../../store/game/actions";
import { RootState } from "../../store/Store";

import { Visualizer } from "./Visualizer";
import StartMessage from "./StartMessage";

type Props = {
  musicUrl: string | null;
  setPlaying?: any;
  isPlaying?: any;
};

const mapStateToProps = (state: RootState) => ({
  isPlaying: state.game.isPlaying
});

const mapDispatchToProps = { setPlaying };

type ComponentProps = ReturnType<typeof mapStateToProps> & Props;

class AudioComponent extends Component<ComponentProps, {}> {
  timer: any;

  audio = new Audio();

  constructor(props: ComponentProps) {
    super(props);
    this.audio.crossOrigin = "anonymous";
  }

  componentDidUpdate() {
    const { musicUrl } = this.props;
    this.stop();
    if (musicUrl) {
      this.audio.src = musicUrl;
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
      debugger;
      this.audio
        .play()
        .then(() => {
          setPlaying(true);
          this.timer = setTimeout(() => this.stop(), 10000);
        })
        .catch(() => setPlaying(false));
    }
  };

  render() {
    const { isPlaying } = this.props;
    return isPlaying ? <Visualizer /> : <StartMessage btnAction={this.play} />;
  }
}

const ConnectedAudio = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioComponent);
// @ts-ignore
export default withRouter(ConnectedAudio);
