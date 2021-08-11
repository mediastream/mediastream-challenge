'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class MyApp extends React.Component {
  render() {
    const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

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


class List extends React.Component {
  // TODO
  render() {
    return (
      <div>
      {this.props.children}
      <ul>
      {this.props.dates.map((date, i) =>
        <Row key={i} i={i} date={date} />
      )}
      </ul>
      </div>
    )
  }
}

List.defaultProps = {
  children: <h1>Default List Header</h1>,
}
List.propTypes = {
  children: PropTypes.node.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired
}

class Row extends React.Component {
  // TODO
  render() {
    return( 
    <li key={this.props.i} onClick={()=>{ alert(this.props.i); }}>{moment(Date.parse(this.props.date)).format('DD/MMM/YYYY')}</li>
    )
  }
}