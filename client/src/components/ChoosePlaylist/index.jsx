import React, { Component } from 'react';
import { connect } from 'react-redux';
import { choosePlaylist, setPlaylists } from '../../store/actions/playlists';
import Button from '../Button/Button';
import axios from '../../helpers/axios';
import Footer from "../Footer";

class ChoosePlaylist extends Component {
  componentDidMount() {
    const { setPlaylists } = this.props;
    axios.get('/playlists').then(({ data }) => setPlaylists(data));
  }

  render() {
    const { playlists, choosePlaylist } = this.props;

    return (
      <>
        <div>
          <h2 className="heading center-xs">Выберите исполнителя</h2>
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
        <Footer />
      </>
    );
  }
}

export default connect(
  state => ({
    playlists: state.playlists.playlists,
  }),
  { setPlaylists, choosePlaylist }
)(ChoosePlaylist);
