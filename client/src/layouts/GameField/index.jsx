/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ChoosePlaylist from '../../components/ChoosePlaylist';

import { setTracks } from '../../store/actions/tracks';
import { setDot } from '../../store/actions/progress';

import AudioComponent from '../../components/AudioComponent';
import Button from '../../components/Button/Button';

import './index.scss';
import ProgressBar from './ProgressBar';

class GameField extends React.Component {
  constructor(props) {
    super(props);

    let url = process.env.WS_HOST || process.env.WS_DEFAULT_HOST;

    this.socket = io(url, {
      transports: ['websocket'],
    });

    this.state = {
      disabled: true,
      choose: null,
      correct: null,
    };
  }

  componentDidMount() {
    const { choosedPlaylist } = this.props;
    if (choosedPlaylist) {
      this.putPlayList();
    }
  }

  componentDidUpdate(prevProps) {
    const { choosedPlaylist } = this.props;
    if (choosedPlaylist !== prevProps.choosedPlaylist) {
      this.putPlayList();
    }
  }

  putPlayList = () => {
    const { choosedPlaylist: playlistId, setTracks, setDot } = this.props;

    this.socket.emit('start', { playlistId });

    this.socket.on('tracks', message => {
      setTracks(message);
      this.setState({ disabled: false });
    });

    this.socket.on('showCorrect', message => {
      this.setState({
        choose: message.choose,
        correct: message.correct,
        disabled: true,
      });
    });

    this.socket.on('guess', message => {
      setDot(message);
    });
  };

  onChoose = trackId => {
    this.socket.emit('choose', { trackId });
  };

  render() {
    const {
      tracks: { tracks },
      isPlaying,
      choosedPlaylist,
    } = this.props;

    const { disabled, choose, correct } = this.state;

    return choosedPlaylist ? (
      <>
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
                      status={
                        item.id === correct
                          ? 'correct'
                          : correct && item.id === choose
                          ? 'error'
                          : null
                      }
                      onClick={() => !disabled && this.onChoose(item.id)}
                    />
                  ))}
                </div>
                <ProgressBar />
              </>
            )}
          </div>
        </div>
        <footer style={{ position: 'fixed', bottom: 40, left: 40 }}>
          <div className="container">
            <div className="row">
              <div className="col-xs">
                <a href="/form">Дать фидбек</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    ) : (
      <ChoosePlaylist />
    );
  }
}

export default connect(
  state => ({
    tracks: state.tracks,
    isPlaying: state.game.isPlaying,
    choosedPlaylist: state.playlists.choosedPlaylist,
  }),
  { setTracks, setDot }
)(GameField);
