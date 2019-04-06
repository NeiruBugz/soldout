import React from "react";
import vinyl from "./vinyl.svg";
import "./App.scss";

const App = () => (
  <div className="hero-section">
    <div className="container">
      <div className="row">
        <div className="col-xs">
          <h2>Узнать за 10 секунд</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-10">
          <p>
            Простая игра, вдохновленная “Афиша.Видео”. Теперь поиграть могут
            не только рэперы, но и ты
          </p>
        </div>
      </div>
    </div>
    <div className="vinyl-container">
      <img src={vinyl} alt="Vinyl"/>
    </div>
  </div>
);

export default App;
