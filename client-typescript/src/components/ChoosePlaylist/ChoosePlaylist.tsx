import React, { Component } from "react";
import { connect } from "react-redux";
import { choosePlaylist, setPlaylists } from "../../store/playlists/actions";

import axios from "../../utils/axios";

import { Button } from "../Button/Button";
import { RootState } from "../../store/Store";

type Playlist = {
  playlistId: string | number;
  name: string;
};

type Props = {
  setPlaylists?: any;
  playlists?: [];
  choosePlaylist?: any;
};

const mapStateToProps = (state: RootState) => {
  playlists: state.playlist.playlists;
};

type ChoosePlaylistProps = ReturnType<typeof mapStateToProps> & Props;

const mapDispatchToProps = { setPlaylists, choosePlaylist };

class ChoosePlaylist extends Component<ChoosePlaylistProps, {}> {
  componentDidMount() {
    const { setPlaylists } = this.props;
    axios.get("/playlists").then(({ data }) => setPlaylists(data));
  }

  render() {
    const { playlists, choosePlaylist } = this.props;
    return (
      <>
        <div>
          <h2 className='heading center-xs'>Выберите исполнителя</h2>
          <div className='button__grid'>
            {playlists.map((item: Playlist) => (
              <Button
                className={""}
                key={item.playlistId}
                label={item.name}
                onClick={() => choosePlaylist(item.playlistId)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePlaylist);
