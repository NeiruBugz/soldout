import block from "bem-cn";
import React from "react";
import Button from "../Button/Button";

const b2 = block("para");

const StartMessage = ({ btnAction }) => (
  <div className="landing">
    <div className="container">
      <div className="wrapper">
        <div className="content">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-lg-6 col-sm-offset-1 col-lg-offset-3 center-xs">
              <p className={b2()}>
                Будет предложено 4 варианта ответа, нужно выбрать один верный,
                соответствующий исполнителю и треку.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-lg-6 col-sm-offset-1 col-lg-offset-3 center-xs">
          <a onClick={btnAction}>
            <Button artist="Понял, поехали" theme="landing" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default StartMessage;
