import React from "react";
import Button from "../../components/Button/Button";
import ProgressDot from "../../components/ProgressDot";
import "./index.scss";
import fetchPlaylist from "../../containers/fetchData";

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
  }

  componentDidMount () {
    this.prepareData();
  };

  prepareData = async () => {
    const response = await fetchPlaylist();
    const { tracks } = response;
    console.log(tracks);
  };

  render () {
    return (
      <div>
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs">
              <p>Time</p>
            </div>
          </div>
          <div className="row ">
            <div className="col-xs-offset-2 col-xs-4">
              <Button artist="ЛСП" track="Холостяк" skin="bright"/>
            </div>
            <div className="col-xs-4">
              <Button artist="Скриптонит" track="Притон" skin="bright"/>
            </div>
            <div className="col-xs-offset-2 col-xs-4">
              <Button artist="Макс Корж" track="Пролетарка" skin="bright"/>
            </div>
            <div className="col-xs-4">
              <Button artist="Darude" track="Sandstorm" skin="bright"/>
            </div>
          </div>
          <ProgressBar arr={tempArr}/>
        </div>
      </div>
    );
  }
}

export default GameField;