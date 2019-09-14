import React from 'react';
import block from 'bem-cn';
import './index.scss';

const b = block('button');

const Button = ({ type, track, artist, theme, status = "", ...rest }) => (
  <button
    className={`${b({ theme })} ${status}`}
    {...rest}
    type={type ? type : "button"}
  >
    <span className={b("artist")}>{artist}</span>
    {track ? <span className={b("track", { theme })}>{track}</span> : null}
  </button>
);

export default Button;
