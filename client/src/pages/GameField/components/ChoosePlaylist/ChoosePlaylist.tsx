import React, { useContext, useEffect } from 'react';

import { GameContext, PlaylistsContext } from '../../../../contexts';
import axios from '../../../../utils/axios';
import { Button } from '../../../../components';
import { Playlist } from '../../../../interfaces';
import styles from '../../../../components/Button/Button.module.sass';
import fieldStyles from '../../GameField.module.sass';

export const ChoosePlaylist = () => {
  const { setPlaylistId } = useContext(GameContext);
  const { playlists, setPlaylists } = useContext(PlaylistsContext);

  useEffect(() => {
    axios.get<Playlist[]>('/playlists').then(({ data }) => setPlaylists(data));
  }, [setPlaylists]);

  return (
    <div className="container">
      <h2 className="heading center-xs">Выберите исполнителя</h2>
      <div className={fieldStyles.button__grid}>
        {playlists.map(playlist => (
          <Button
            className={styles.landingButton}
            key={playlist.playlistId}
            label={playlist.name}
            onClick={() => setPlaylistId(playlist.playlistId)}
          />
        ))}
      </div>
        </div>
  );
};
