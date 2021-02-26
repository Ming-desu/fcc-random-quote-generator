import React from 'react';
import Quote from './components/Quote';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <h1 className="text-center mb-5">Random Quote Generator</h1>
        <Quote />
      </div>
    )
  }
}

export default App;
