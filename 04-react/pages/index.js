'use strict';

console.log(`
4.
---

We require a 'List' component that will receive an array of dates (formated as ISO Dates (Date-Time))
and it has to render those to 'Row' components.

This 'Row' component can be as simple as you want,
but it must display the dates like the following example: '(12/jun/2013)'
and on click must 'alert()' its index in the list.

Also, the 'List' component should receive an optional child as a header.
Remember to validate the props.

The implementation **must focus on performance**.

Take a look at the MyApp component, you should not modify it.

NOTE: You can use ES7+ here and install any library not tied to React.
Example:
- lodash: OK
- react-dates: NOPE
`);

import React from 'react';
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
  constructor() {
    super();
    this.getRows = this.getRows.bind(this);
  }

  getRows() {
    return this.props.dates.map((date, index) => {
      console.log(date);
      return <Row unformattedDate={date} dateIndex={index} key={date}/>;
    });
  }
  render() {

    return (<ul>{this.props.children}{this.getRows()}</ul>);
  }
}

class Row extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    alert(this.props.dateIndex);
  }

  render() {
    return (<li  key={this.props.dateIndex} onClick={this.handleClick}> {moment(this.props.unformattedDate).format('DD/MMM/YYYY')} </li>);
  }
}

List.propTypes = {dates: React.PropTypes.array.isRequired};
