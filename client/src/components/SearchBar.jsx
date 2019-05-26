/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ query: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.query === '') {
      return;
    }
    const copiedData = Object.assign({}, this.props.state);
    const { query } = this.state;
    const chunks = [];
    const allReviews = copiedData.reviewsData;
    const oldPages = copiedData.pages;
    // --------------------------- Filter Through all Reviews ----------------------------
    const filtered = allReviews.filter((review) => {
      if (review.message.includes(` ${query} `)
       || review.message.includes(`${query} `)
       || review.message.includes(` ${query}.`)
       || review.message.includes(` ${query}?`)
       || review.message.includes(` ${query},`)) {
        return review;
      }
    });
    // --------------------------- Filter through each Message ---------------------
    for (let j = 0; j < filtered.length; j += 1) {
      const messages = filtered[j].message.split(' ');
      for (let k = 0; k < messages.length; k += 1) {
        if (messages[k].includes(`${query}`)) {
          messages[k] = messages[k].toUpperCase();
        }
      }
      const newMessages = messages.join(' ');
      filtered[j].message = newMessages;
    }
    // --------------------------Break Reviews into Chunks for pagination -----------------
    for (let i = 0; i < filtered.length; i += 5) {
      const myChunk = filtered.slice(i, i + 5);
      chunks.push(myChunk);
    }
    // -------------------------SEND DATA BACK TO APP ---------------------------------
    this.props.search(chunks, filtered, allReviews, oldPages, query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <form
        style={{ position: 'relative' }}
        onSubmit={this.onSubmitHandler}
      >
        <input
          type="text"
          value={this.state.query}
          onChange={this.onChangeHandler}
          submit="Hello"
        />
      </form>
    );
  }
}
export default SearchBar;
