import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("progress-dot");

class ProgressDot extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <span className={b({ color: this.props.color })}>&nbsp;</span>
    );
  }
}

export default ProgressDot;