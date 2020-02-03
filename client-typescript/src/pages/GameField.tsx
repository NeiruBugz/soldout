import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../store/Store";

import { choosePlaylist } from "../store/playlists/actions";
import { setTracks } from "../store/tracks/actions";
import { setDot } from "../store/progress/actions";

import { Button } from "../components/Button/Button";
import { WS_DEFAULT_HOST } from "../utils/variables";
import ChoosePlaylist from "../components/ChoosePlaylist/ChoosePlaylist";

type Track = {
  id: string | number;
  artist: string;
  name: string;
};

const mapStateToProps = (state: RootState) => ({
  tracks: state.tracks,
  isPlaying: state.game.isPlaying,
  chosenPlaylist: state.playlist.chosenPlaylist,
});

const mapDispatchToProps = { setTracks, setDot, choosePlaylist };

type GameFieldProps = {
  chosenPlaylist: any;
  setTracks: any;
  setDot: any;
  choosePlaylist: any;
};

type Props = ReturnType<typeof mapStateToProps> & GameFieldProps;

type State = {
  disabled: boolean;
  choose: any;
  correct: any;
};

class GameField extends Component<Props, State> {
  url = process.env.WS_HOST || WS_DEFAULT_HOST;
  socket = io(this.url, {
    transports: ["websocket"],
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      disabled: true,
      choose: null,
      correct: null,
    };
  }

  componentDidMount() {
    const { chosenPlaylist } = this.props;
    chosenPlaylist && this.putPlaylist();
  }

  putPlaylist = () => {
    const { chosenPlaylist: playlistId, setTracks, setDot, choosePlaylist } = this.props;

    this.socket.emit("start", { playlistId });

    this.socket.on("tracks", (message: [{}]) => {
      setTracks(message);
      this.setState({ disabled: false });
    });

    this.socket.on("showCorrect", (message: { choose: any; correct: any }) => {
      this.setState({
        choose: message.choose,
        correct: message.correct,
        disabled: true,
      });
    });

    this.socket.on("guess", (message: boolean) => {
      setDot(message);
    });

    this.socket.on("disconnect", () => {
      choosePlaylist(null);
    });
  };

  onChoose = (trackId: string | number) => {
    this.socket.emit("choose", { trackId });
  };

  render() {
    const {
      tracks: { tracks },
      isPlaying,
      chosenPlaylist,
    } = this.props;
    const { disabled, choose, correct } = this.state;
    return chosenPlaylist ? (
      <>
        <div className='field'>
          <div className='container'>
            {isPlaying && (
              <>
                <div className='button__grid'>
                  {tracks.tracks.map((item: Track) => (
                    <Button
                      className={""}
                      key={item.id}
                      label={item.artist}
                      onClick={() => {
                        !disabled && this.onChoose(item.id);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    ) : (
      <ChoosePlaylist />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
