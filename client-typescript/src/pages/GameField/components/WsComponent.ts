import React, { useContext, useEffect, useMemo } from 'react';
import { GameContext, TracksContext } from '../../../contexts';
import io from 'socket.io-client';
import { WS_HOST } from '../../../utils/variables';
import { Track } from '../../../interfaces';

export const WsComponent: React.FC = () => {
  const {
    playlistId,
    selectedTrack,
    setAudioSrc,
    setCorrectTrack,
    addDot,
    setPlaylistId,
    setSelectedTrack,
  } = useContext(GameContext);
  const { setTracks } = useContext(TracksContext);

  const socket = useMemo(
    () =>
      io(WS_HOST, {
        transports: ['websocket'],
      }),
    [],
  );

  useEffect(() => {
    if (!playlistId) return;

    socket.emit('start', { playlistId });

    // TODO: файл WsComponent.types.ts и в него вынести типы для данных, чтобы здесь не описывать что приходит с сервера
    socket.on('tracks', ({ src, tracks }: { src: string; tracks: Track[] }) => {
      setTracks(tracks);
      setAudioSrc(src);
    });

    socket.on(
      'showCorrect',
      ({ choose, correct }: { choose: number; correct: number }) => {
        setSelectedTrack(choose);
        setCorrectTrack(correct);
      },
    );

    socket.on('guess', (newDot: boolean) => {
      addDot(newDot);
    });

    socket.on('disconnect', () => {
      setPlaylistId(undefined);
    });
  }, [
    socket,
    playlistId,
    setPlaylistId,
    setTracks,
    setSelectedTrack,
    setAudioSrc,
    setCorrectTrack,
  ]);

  useEffect(() => {
    if (!selectedTrack) return;
    socket.emit('choose', { trackId: selectedTrack });
  }, [socket, selectedTrack]);

  return null;
};
