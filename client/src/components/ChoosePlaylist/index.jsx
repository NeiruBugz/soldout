import React, { Component } from 'react';
import { connect } from 'react-redux';
import { choosePlaylist, setPlaylists } from '../../store/actions/playlists';
import Button from '../Button/Button';
import axios from '../../helpers/axios';

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
    );
  }
}

export default connect(
  state => ({
    playlists: state.playlists.playlists,
  }),
  { setPlaylists, choosePlaylist }
)(ChoosePlaylist);
