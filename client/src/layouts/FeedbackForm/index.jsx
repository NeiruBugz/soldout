import React from "react";
import axios from "../../helpers/axios";

import Button from "../../components/Button/Button";

import "./styles.scss";

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      playlists: "",
      bugs: "",
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    let data = this.state;
    console.log(data);
    axios.post("/reviews", { data });
  };

  onRangeChange = e => {
    this.setState({
      score: e.target.value,
    });
  };

  onGenresChange = e => {
    this.setState({ playlists: e.target.value });
  };

  onBugsChange = e => {
    this.setState({ bugs: e.target.value });
  };

  render() {
    let { score } = this.state;
    return (
      <section className="form-layout">
        <>
          <h1 className="form-layout__title">Помоги сделать сервис лучше</h1>
          <p className="form-layout__subtitle">опрос займет 1 минуту</p>
        </>
        <form className="form" onSubmit={this.onFormSubmit}>
          <>
            <label htmlFor="like-range">Тебе понравилось?</label>
            <input
              type="range"
              id="like-range"
              min="0"
              max="10"
              step="1"
              value={score}
              onChange={this.onRangeChange}
            />
          </>
          <>
            <label htmlFor="missing-input">
              Каких жанров/плейлистов не хватает?
            </label>
            <input
              type="text"
              id="missing-input"
              placeholder="Напиши что-нибудь"
              onChange={this.onGenresChange}
            />
          </>
          <>
            <label htmlFor="bug-report">
              Ошибки, баги и предложения. Напиши тут{" "}
              <span role="img" aria-label="love-emoji">
                ❤️
              </span>
            </label>
            <input
              type="text"
              id="bug-report"
              placeholder="Напиши что-нибудь"
              onChange={this.onBugsChange}
            />
          </>
          <Button artist="Отправить и получить бонусный раунд" type="submit" />
        </form>
      </section>
    );
  }
}

export default FeedbackForm;
