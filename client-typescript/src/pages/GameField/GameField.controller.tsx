import React, { useCallback, useState } from 'react';
import { Playlist, Track } from '../../interfaces';
import { GameContext, PlaylistsContext, TracksContext } from '../../contexts';
import { GameField } from './GameField';
import { WsComponent } from './components/WsComponent';

export const GameFieldController = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistId, setPlaylistId] = useState<number | undefined>();
  const [selectedTrack, setSelectedTrack] = useState<number | undefined>();
  const [correctTrack, setCorrectTrack] = useState<number | undefined>();
  const [dots, setDots] = useState<boolean[]>([]);
  const [audioSrc, setAudioSrc] = useState<string>();

  const addDot = useCallback(
    (newDot: boolean) => {
      dots.push(newDot);
      setDots(dots);
    },
    [dots, setDots],
  );

  return (
    <GameContext.Provider
      value={{
        audioSrc,
        setAudioSrc,
        selectedTrack,
        setSelectedTrack,
        playlistId,
        setPlaylistId,
        dots,
        setDots,
        addDot,
        correctTrack,
        setCorrectTrack,
      }}
    >
      <PlaylistsContext.Provider value={{ playlists, setPlaylists }}>
        <TracksContext.Provider value={{ tracks, setTracks }}>
          <GameField />
          <WsComponent />
        </TracksContext.Provider>
      </PlaylistsContext.Provider>
    </GameContext.Provider>
  );
};
