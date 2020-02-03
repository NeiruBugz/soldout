/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ChoosePlaylist from '../../components/ChoosePlaylist';
import Footer from '../../components/Footer';
import { WS_DEFAULT_HOST } from '../../helpers/variables';
import { choosePlaylist } from '../../store/actions/playlists';
import { setTracks } from '../../store/actions/tracks';
import { setDot } from '../../store/actions/progress';
import AudioComponent from '../../components/AudioComponent';
import Button from '../../components/Button/Button';
import './index.scss';
import ProgressBar from './ProgressBar';
type GameFieldState = {
  disabled: boolean;
  choose: null;
  correct: null;
};
type GameFieldProps = {
  choosedPlaylist: any;
  setTracks: any;
  setDot: any;
  choosePlaylist: any;
  tracks: any;
  isPlaying: boolean;
};

// @ts-ignore
class GameField extends React.Component<GameFieldProps, GameFieldState> {
  url = process.env.WS_HOST || WS_DEFAULT_HOST;
  socket = io(this.url, {
    transports: ['websocket'],
  });

  constructor(props) {
    super(props);
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
    const {
      choosedPlaylist: playlistId,
      setTracks,
      setDot,
      choosePlaylist,
    } = this.props;
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
    this.socket.on('disconnect', () => {
      choosePlaylist(null);
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
    const audioProps = {
      musicUrl: tracks.src,
    };
    const { disabled, choose, correct } = this.state;
    return choosedPlaylist ? (
      <>
        <div className="field">
          <div className="container">
            <div className="row center-xs">
              <div className="col-xs">
                <AudioComponent {...audioProps} />
              </div>
            </div>
            {isPlaying && (
              <>
                <div className="button__grid">
                  {tracks.tracks.map((item: any) => (
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
        <Footer />
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
  { setTracks, setDot, choosePlaylist }
)(GameField);
