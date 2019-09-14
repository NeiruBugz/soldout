import React from "react";
import "./styles.scss";

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: 0,
      genres: "",
      bugs: "",
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
  };
  onRangeChange = e => {
    console.log(e.target.value);
    this.setState({
      rangeValue: e.target.value,
    });
  };

  onGenresChange = e => {
    this.setState({ genres: e.target.value });
  };

  onBugsChange = e => {
    this.setState({ bugs: e.target.value });
  };

  render() {
    let { rangeValue } = this.state;
    return (
      <section className="form-layout">
        <>
          <h1 className="form-layout__title">Помоги сделать сервис лучше</h1>
          <p className="form-layout__subtitle">опрос 1 минута</p>
        </>
        <form className="form">
          <>
            <label htmlFor="like-range">Тебе понравилось?</label>
            <input
              type="range"
              id="like-range"
              min="0"
              max="10"
              step="1"
              value={rangeValue}
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
        </form>
      </section>
    );
  }
}

export default FeedbackForm;
