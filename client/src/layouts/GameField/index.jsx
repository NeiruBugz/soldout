import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import ProgressDot from "../../components/ProgressDot";
import AudioVisualizer from "../../components/AudioVisualizer";
import Button from "../../components/Button/Button";
import { setTracks } from "../../store/actions/tracks";

import "./index.scss";
import { bindActionCreators } from "redux";

const tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const ProgressBar = ({ arr }) => (
  <div className="progress-bar">
    {arr.map(item => (
      <ProgressDot key={item} />
    ))}
  </div>
);

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
      console.log("guess", message);
    });
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
              <div key={item.src} className="col-xs-6">
                <Button artist={item.artist} track={item.name} skin="bright" />
              </div>
            ))}
          </div>
          <ProgressBar arr={tempArr} />
        </div>
      </div>
    );
  }
}

export default connect(state =>
    ({ tracks: state.tracks }),
  dispatch =>
    ({ setTracks: bindActionCreators(setTracks, dispatch) }))(GameField);