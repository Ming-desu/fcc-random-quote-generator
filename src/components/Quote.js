import React from 'react';
import axios from 'axios';
import './Quote.css';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      text: '',
      author: '',
      tweet: ''
    };

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.generateQuote = this.generateQuote.bind(this);
    this.handleNextQuote = this.handleNextQuote.bind(this);
  }

  handleOnLoad() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => {
        this.setState({
          quotes: res.data.quotes
        });

        this.generateQuote();
      })
      .catch(err => console.log(err));
  }

  handleNextQuote() {
    this.generateQuote();
  }

  generateQuote() {
    let random = Math.floor(Math.random() * this.state.quotes.length);

    this.setState(state => {
      return {
        text: state.quotes[random].quote,
        author: state.quotes[random].author,
        tweet: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURI(state.quotes[random].quote + ' ' + state.quotes[random].author)
      }
    })
  }

  render() {
    return (
      <div id="quote-box">
        <div className="card">
          <div className="card-body">
            <blockquote>
              <span className="fa fa-quote-left"></span> <span id="text">{this.state.text}</span>
            </blockquote>
            <cite className="quote-author">- <span id="author">{this.state.author}</span></cite>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <a href={this.state.tweet} className="btn btn-secondary" id="tweet-quote"><span className="fa fa-twitter"></span></a>
              <button className="btn btn-success" id="new-quote" onClick={this.handleNextQuote}>Next Quote</button>
            </div>
          </div>
        </div>
        <footer className="p-4 text-center">
          <p>Made with ❤️ by <a href="https://github.com/Ming-desu" className="link-secondary" title="Github Account" target="_blank" rel="noreferrer">Joshua Ming</a></p>
        </footer>
      </div>
    )
  }

  componentDidMount() {
    this.handleOnLoad();
  }
}

export default Quote;