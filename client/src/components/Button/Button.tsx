import React from 'react';
import block from 'bem-cn';
import './index.scss';

interface ButtonProps {
  type?: string;
  track?: string;
  theme?: string;
  status?: string;
  artist?: string;
  id?: any;
}

const b = block('button');
// @ts-ignore
const Button: React.FC = ({
  track,
  theme,
  status,
  artist,
  id,
}: ButtonProps) => (
  <button className={`${b({ theme })} ${status}`}>
    <span className={b('artist')}>{artist}</span>
    {track ? <span className={b('track', { theme })}>{track}</span> : null}
  </button>
);
export default Button;
