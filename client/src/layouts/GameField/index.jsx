import React from "react";
import ProgressDot from "../../components/ProgressDot";
import putPlayList from "../../containers/fetchData";
import "./index.scss";

const tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const ProgressBar = ({ arr }) => (
  <div className="progress-bar">
    {arr.map(item => (
      <ProgressDot key={item}/>
    ))}
  </div>
);

class GameField extends React.Component {

  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      tracks: [],
    };
  }

  componentDidMount () {
    // this.prepareData();
    putPlayList();
  };

  getRandomTracks = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
  };

  // prepareData = async () => {
  //   const showedTracks = [];
  //   const response = await fetchPlaylist();
  //   const { tracks } = response;
  //   let resultTracks = tracks.sort(() => Math.random() - 0.5);
  //   resultTracks = resultTracks.slice(0, 20);
  //   for (let i = 0; i < 3; i++) {
  //     showedTracks.push(resultTracks[this.getRandomTracks(0, 20)]);
  //   }
  //   const rightTrack = resultTracks[this.getRandomTracks(0, 20)];
  //   showedTracks.push(rightTrack);
  //   console.table(showedTracks);
  //   this.setState({ tracks: showedTracks });
  // };

  render () {
    // const { tracks } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs">
              <p>Time</p>
            </div>
          </div>

          {/*<div className="row ">*/}
          {/*  {tracks.map(item => (*/}
          {/*    <div key={item.src} className="col-xs-6">*/}
          {/*      <Button artist={item.artist.name} track={item.name} skin="bright"/>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          <ProgressBar arr={tempArr}/>
        </div>
      </div>
    );
  }
}

export default GameField;