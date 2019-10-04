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
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from '../components/Row';

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

    const { children } = this.props;

    return  (
      <div>
        { children }
        <h1>List of dates</h1>
        { this.props.dates.map((date, key) => (

          <Row date={dateFormat(date)} handleClickDate={handleClickDate} index={key} key={key} />
        ))}
      </div>
    );
  }
}

/**
 * 
 * @param index 
 */
function handleClickDate(index) {
  alert("Index: " + index)
}

/**
 * hace un format de la fecha
 * @param date 
 */
function dateFormat(date) {
  const d = moment.utc(date);
  return d.format('DD/MMM/YYYY ').toString();
}

List.propTypes = {
  children: PropTypes.node,
  dates: PropTypes.array.isRequired
};

List.defaultProps = {
  children : '',
}