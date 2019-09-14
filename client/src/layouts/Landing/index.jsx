import React from "react";
import block from "bem-cn";

import "./index.scss";
import vinyl from "../../vinyl.svg";
import Button from "../../components/Button/Button";

const b = block("heading");
const b2 = block("para");

const Landing = () => (
  <div className="landing">
    <div className="container">
      <div className="wrapper">
        <div className="content">
          <div className="row">
            <div className="col-xs-9 col-md-8 col-lg-6">
              <h1 className={b()}>Узнать за 10 секунд</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-9 col-md-8 col-lg-6">
              <p className={b2()}>
                Простая игра, вдохновленная «Афиша. Видео». Теперь поиграть
                могут не только рэперы, но и ты
              </p>
            </div>
          </div>
        </div>
        <div className="vinyl">
          <img className="vinyl__image" src={vinyl} alt="Vinyl" />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-10 col-md-10 col-lg-4">
          <a href="/game">
            <Button artist="Сыграть" theme="landing" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
