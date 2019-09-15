import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ position: 'fixed', bottom: 40, left: 40 }}>
    <div className="container">
      <div className="row">
        <div className="col-xs">
          <Link to="/form">Оставить отзыв</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
