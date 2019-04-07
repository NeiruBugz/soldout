import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import io from "socket.io-client";

import ProgressDot from "../../components/ProgressDot";
import AudioVisualizer from "../../components/AudioVisualizer";
import Button from "../../components/Button/Button";
import { setTracks } from "../../store/actions/tracks";
import { setDot } from "../../store/actions/progress";

import "./index.scss";

const tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

let ProgressBar = ({ dots }) => {
  const myDots = [...dots.dots];
  console.log(dots, myDots);
  return (
    <div className="progress-bar">
      {myDots.map(item => (
        // eslint-disable-next-line no-nested-ternary
        <ProgressDot key={item} color={item !== null ? (item ? "green" : "red") : "black"} />
      ))}
    </div>);
};

ProgressBar = connect(state => ({
  dots: state.progressBar,
}))(ProgressBar);

class GameField extends React.Component {

  constructor (props) {
    super(props);
    console.log(props);
    this.socket = io("ws://gts.dergunov.net:3000", { transports: ["websocket"] });
  }

  componentDidMount () {
    this.putPlayList();
  };

  putPlayList = () => {
    const playlistId = "5734677122";
    this.socket.emit("start", { playlistId });
    this.socket.on("tracks", message => {
      this.props.setTracks(message);
    });
    this.socket.on("guess", message => {
      this.props.setDot(message);
    });
  };

  onChoose = (trackId) => {
    this.socket.emit("choose", { trackId });
  };

  render () {
    const { tracks } = this.props.tracks;
    return (
      <div className="field">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs">
              <AudioVisualizer musicUrl={tracks.src} />
            </div>
          </div>

          <div className="row ">
            {tracks.tracks.map(item => (
              <div key={item.id} className="col-xs-6">
                <Button
                  artist={item.artist}
                  track={item.name}
                  skin="bright"
                  onClick={() => this.onChoose(item.id)}
                />
              </div>
            ))}
          </div>
          <ProgressBar />
        </div>
      </div>
    );
  }
}

export default connect(state =>
    ({ tracks: state.tracks }),
  dispatch =>
    ({
      setTracks: bindActionCreators(setTracks, dispatch),
      setDot: bindActionCreators(setDot, dispatch),
    }))(GameField);