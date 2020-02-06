import React, { useContext, useEffect, Fragment } from 'react';
import { ChoosePlaylist } from './components/ChoosePlaylist';
import { AudioComponent } from './components/AudioComponent';
import { GameContext, TracksContext } from '../../contexts';
import { Button } from '../../components';

import fieldStyles from './GameField.module.sass';

export const GameField: React.FC = () => {
  const {
    playlistId,
    setSelectedTrack,
    setCorrectTrack,
    setPlaylistId,
    selectedTrack,
    audioSrc,
    correctTrack,
  } = useContext(GameContext);
  const { tracks } = useContext(TracksContext);
  const { dots } = useContext(GameContext);
  // при новом треке - чистим выбранный и правильный
  useEffect(() => {
    setSelectedTrack(undefined);
    setCorrectTrack(undefined);
  }, [audioSrc]);

  // unload
  useEffect(
    () => () => {
      setPlaylistId(undefined);
    },
    [],
  );

  console.log(dots);

  return playlistId ? (
    // TODO: иналайновые стили не очень хорошая тема. Нужно стилизовать либо через CSS-modules, либо CSS-IN-JS
    <div className="field" style={{ height: '100vh' }}>
      <div className="container" style={{ height: '100%' }}>
        <div className="col-xs center-xs">
          <AudioComponent musicUrl={audioSrc} />
        </div>
        {dots.length < 21 ? (
          <div className={fieldStyles.button__grid}>
            {tracks.map(track => (
              <Button
                key={track.id}
                label={track.name}
                subLabel={track.artist}
                onClick={() => setSelectedTrack(track.id)}
                // TODO: Можно подключить библиотечку типа classnames
                className={
                  track.id === correctTrack
                    ? fieldStyles.correct
                    : correctTrack && track.id === selectedTrack
                    ? fieldStyles.error
                    : ''
                }
              />
            ))}
            {/* TODO: component with dots*/}
          </div>
        ) : (
          <div className="center-xs">
            <h2>Игра окончена!</h2>
            <p>Ваш результат: {dots.filter(Boolean).length} из 20</p>
          </div>
        )}
        {dots.length > 0 && (
          <div className="center-xs">
            <span className={fieldStyles.progress}>
              {dots.filter(Boolean).length} / 20{' '}
            </span>
          </div>
        )}
      </div>
    </div>
  ) : (
    <ChoosePlaylist />
  );
};
