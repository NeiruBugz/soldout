import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components';
import styles from '../../components/Button/Button.module.sass';
import landing from './Landing.module.sass';

// TODO: ооочень много блоков
export const Landing: React.FC = () => (
  <div className={landing.landing}>
    <div className="container">
      <div className={landing.wrapper}>
        <div className={landing.content}>
          <div className="row">
            <div className="col-xs-9 col-md-8 col-lg-6">
              <h1>Узнать за 10 секунд</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-9 col-md-8 col-lg-6">
              <p>
                Угадывай песни популярных исполнителей, соревнуйся с друзьями и
                делись результатами в инстаграме.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-10 col-md-10 col-lg-4">
          <Link to="/game">
            <Button label="Сыграть" className={styles.landingButton} />
          </Link>
        </div>
      </div>
    </div>
  </div>
);
