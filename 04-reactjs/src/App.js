import React from 'react';
import List from './components/List';
import parseDates from './utils/parseDate';
import './App.css';

class App extends React.Component {
  state = {}

  render() {
    const dates = parseDates(['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z']);

    return (
      <div>
        <h1>04 - React</h1>
        <List dates={dates} />
        <hr />
        <List dates={dates}>
          <h1>Optional Header</h1>
        </List>
      </div>
    );
  }
}

export default App;