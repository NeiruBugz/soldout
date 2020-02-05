import React from 'react';
import { Button } from '../../../../../../components';
import { MessageProps } from './StartMessage.types';

export const StartMessage: React.FC<MessageProps> = ({ btnAction }) => (
  <div className="landing">
    <div className="container">
      <div className="wrapper">
        <div className="content">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-lg-6 col-sm-offset-1 col-lg-offset-3 center-xs">
              <p>
                Будет предложено 4 варианта ответа, нужно выбрать один верный,
                соответствующий исполнителю и треку.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-lg-6 col-sm-offset-1 col-lg-offset-3 center-xs">
          {/*Добавить еще одну страницу в роутинг, а здесь ссылку. и колбэк не нужен*/}
          <Button label="Понял, поехали" onClick={btnAction} />
        </div>
      </div>
    </div>
  </div>
);
