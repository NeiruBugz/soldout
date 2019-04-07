import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("button");

class Button extends React.Component {
  render () {
    const { track, artist, theme } = this.props;

    return (
      <button className={b({ theme })} type="submit">
        <p className={b("artist")}>{artist}</p>
        {track
          ? <p className={b("track")}>
            {track}
          </p>
          : null}
      </button>
    );
  }
}

export default Button;