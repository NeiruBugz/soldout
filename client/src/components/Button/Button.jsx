import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("button");

const Button = ({ track, artist, theme, ...rest }) => (
  <button className={b({ theme })} {...rest} type="button">
    <p className={b("artist")}>{artist}</p>
    {track ? <p className={b("track")}>{track}</p> : null}
  </button>
);

export default Button;
