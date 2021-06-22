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

The implementation must focus on performance.

Take a look at the MyApp component, you should not modify it.

NOTE: You can use ES7+ here and install any library not tied to React.
Example:
- lodash: OK
- react-dates: NOPE
`);

import React from 'react';
import PropTypes from 'prop-types';

const transformDate = (date) => {
  date = new Date(date);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${day}/${month.substr(0,3)}/${year}`;
};

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
  render() {
    const { children, dates } = this.props;
    return (
      <ul>
        {children}
        {dates.map((date, index) => {
          return <Row date={date} index={index} key={index} />;
        })}
        <style jsx>{`
          ul {
            list-style: none;
          }
          .item {
            color: blue;
            cursor: pointer;
            padding: 10px;
          }
        `}</style>
      </ul>
    );
  }
}

List.propTypes = {
  dates: PropTypes.array.isRequired
};

class Row extends React.Component {
  render() {
    const { index, date } = this.props;
    const showAlert = () => alert(`This is the date with index ${index}`);
    return <li onClick={showAlert} className="item">{transformDate(date)}</li>;
  }
}

Row.propTypes = {
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};