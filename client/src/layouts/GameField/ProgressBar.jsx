import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ProgressDot from "../../components/ProgressDot";
import { choosePlaylist } from "../../store/actions/playlists";

const ProgressBar = ({ dots, history, choosePlaylist }) => {
  const myDots = [...dots.dots];
  if (myDots.length === 20) {
    choosePlaylist(null);
    history.push("/");
  }
  while (myDots.length < 20) {
    myDots.push(null);
  }

  return (
    <div className="progress-bar">
      {myDots.map((item, index) => (
        <ProgressDot
          key={index}
          color={item !== null ? (item ? "green" : "red") : "black"}
        />
      ))}
    </div>
  );
};

export default withRouter(
  connect(
    state => ({
      dots: state.progressBar,
    }),
    { choosePlaylist }
  )(ProgressBar)
);
