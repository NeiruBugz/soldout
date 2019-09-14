import React, { Component } from "react";
import { connect } from "react-redux";
import { choosePlaylist, setPlaylists } from "../../store/actions/playlists";
import Button from "../Button/Button";

class ChoosePlaylist extends Component {
  componentDidMount() {
    const { setPlaylists } = this.props;
    fetch("http://localhost:4000/playlists")
      .then(res => res.json())
      .then(res => setPlaylists(res));
  }
  
  render() {
    const { playlists, choosePlaylist } = this.props;

    return (
      <div>
        <h2 className="heading center-xs">Выберите жанр</h2>
        <div className="button__grid">
          {playlists.map(item => (
            <Button
              key={item.playlistId}
              id={`track_${item.playlistId}`}
              artist={item.name}
              skin="bright"
              onClick={() => choosePlaylist(item.playlistId)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    playlists: state.playlists.playlists,
  }),
  { setPlaylists, choosePlaylist }
)(ChoosePlaylist);
