/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import { setTracks } from "../../store/actions/tracks";
import { setDot } from "../../store/actions/progress";

import AudioComponent from "../../components/AudioComponent";
import Button from "../../components/Button/Button";

import "./index.scss";
import ProgressBar from "./ProgressBar";

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("wss://api.gts.dergunov.net", {
      transports: ["websocket"],
    });
  }

  componentDidMount() {
    this.putPlayList();
  }

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
    const {
      tracks: { tracks },
      isPlaying,
    } = this.props;

    return (
      <div className="field">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs">
              <AudioComponent musicUrl={tracks.src} />
            </div>
          </div>
          {isPlaying && (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tracks: state.tracks,
    isPlaying: state.game.isPlaying,
  }),
  { setTracks, setDot }
)(GameField);
