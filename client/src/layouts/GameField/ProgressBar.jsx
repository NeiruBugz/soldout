import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ProgressDot from '../../components/ProgressDot';

const ProgressBar = ({ dots, history }) => {
  const myDots = [...dots.dots];
  if (myDots.length === 20) {
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
  connect(state => ({
    dots: state.progressBar,
  }))(ProgressBar)
);
