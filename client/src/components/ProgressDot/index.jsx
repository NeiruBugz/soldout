import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("progress-dot");

class ProgressDot extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filled: null,
    };
  }

  render () {
    return (
      <span className={b()}>&nbsp;</span>
    );
  }
}

export default ProgressDot;