import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seenIndexes: [],
      values: {},
      index: '',
    };
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  onIndexChange = (e) => {
    const { value } = e.target;
    this.setState({ index: value });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', { index: this.state.index });
    this.setState({ index: '' });
  };

  async fetchValues() {
    const res = await axios.get('/api/values/current');
    this.setState({ values: res.data });
  }

  async fetchIndexes() {
    const res = await axios.get('/api/values/all');
    this.setState({ seenIndexes: res.data });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Enter an index:</label>
          <input
            value={this.state.index}
            onChange={this.onIndexChange}
          />
          <button>Submit</button>
        </form>

        <h3>Previous Indexes</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values</h3>
        {this.renderValues()}
      </div>
    );
  }
}
