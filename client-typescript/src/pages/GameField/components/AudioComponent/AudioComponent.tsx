import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Visualizer } from './components';
import { Props } from './AudioComponent.types';

export const AudioComponent: React.FC<Props> = ({ musicUrl }) => {
  const [timer, setTimer] = useState<number>();
  const audio = useMemo(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    return audio;
  }, []);

  const stop = useCallback(() => {
    audio.currentTime = 0;
    audio.pause();
    audio.oncanplaythrough = null;
  }, [audio]);

  const play = useCallback(() => {
    audio
      .play()
      .then(() => {
        setTimer(window.setTimeout(stop, 10000));
      })
      .catch(() => console.error('Невозможно проиграть песню'));
  }, [audio]);

  useEffect(() => {
    clearTimeout(timer);
    stop();

    if (musicUrl) {
      audio.oncanplaythrough = play;
      audio.src = musicUrl;
    }
  }, [audio, musicUrl]);

  // unload
  useEffect(() => stop, [stop]);

  return musicUrl ? <Visualizer /> : null;
};
