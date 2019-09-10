/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { withRouter } from "react-router";
import io from "socket.io-client";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setTracks } from "../../store/actions/tracks";
import { setDot } from "../../store/actions/progress";

import ProgressDot from "../../components/ProgressDot";
import AudioVisualizer from "../../components/AudioVisualizer";
import Button from "../../components/Button/Button";

import "./index.scss";

let ProgressBar = ({ dots, history }) => {
  const myDots = [...dots.dots];
  if (myDots.length === 20) {
    history.push("/");
  }
  while (myDots.length < 20) {
    myDots.push(null);
  }

  return (
    <div className="progress-bar">
      {myDots.map((item, index) => (
        <ProgressDot
          key={index}
          color={item !== null ? (item ? "green" : "red") : "black"}
        />
      ))}
    </div>
  );
};

ProgressBar = withRouter(
  connect(state => ({
    dots: state.progressBar,
  }))(ProgressBar)
);

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("wss://api.music10.ru", {
      transports: ["websocket"],
    });
  }

  componentDidMount() {
    this.putPlayList();
  }

  // UNSAFE_componentWillReceiveProps() {
  //   this.setState({ disabledButton: false });
  // }

  putPlayList = () => {
    const playlistId = "248297032";
    this.socket.emit("start", { playlistId });
    this.socket.on("tracks", message => {
      this.props.setTracks(message);
    });
    this.socket.on("showCorrect", message => {
      document.getElementById(`track_${message.choose}`).classList.add("error");
      document
        .getElementById(`track_${message.correct}`)
        .classList.add("correct");
    });
    this.socket.on("guess", message => {
      this.props.setDot(message);
    });
  };

  onChoose = trackId => {
    this.socket.emit("choose", { trackId });
  };

  render() {
    const { tracks } = this.props.tracks;
    return (
      <div className="field">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs">
              <AudioVisualizer musicUrl={tracks.src} />
            </div>
          </div>
          <div className="button__grid">
            {tracks.tracks.map(item => (
              <Button
                key={item.id}
                id={`track_${item.id}`}
                artist={item.artist}
                track={item.name}
                skin="bright"
                onClick={() => this.onChoose(item.id)}
              />
            ))}
          </div>
          <ProgressBar />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ tracks: state.tracks }),
  dispatch => ({
    setTracks: bindActionCreators(setTracks, dispatch),
    setDot: bindActionCreators(setDot, dispatch),
  })
)(GameField);
