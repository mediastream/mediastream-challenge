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
import _ from 'lodash';

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
  /**
   * Optional header
   * @type {DOMElement|null}
   */
  header = null;

  /**
   * Date display format
   * @type {String}
   */
  format = 'DD/MMM/YYYY';

  /**
   * Holds each row of the list
   * @type {Array}
   */
  rows = [];

  render() {
    // Get the optional header
    if (this.props.children) {
      this.header = <header>{this.props.children}</header>;
    }

    // Validate and parse the dates
    _.each(this.props.dates, (isoDate, index) => {
      const date = moment(isoDate);
      if (!date.isValid()) {
        return true;
      }

      const formattedDate = date.format(this.format).toLowerCase();

      this.rows.push(<Row key={index} index={index} content={formattedDate} />);
    });

    return (
      <div className="list">
        {this.header}
        <ul>{this.rows}</ul>
      </div>
    );
  }
}

class Row extends React.Component {
  /**
   * This row index
   * @type {Number}
   */
  index = this.props.index;

  /**
   * This row content
   * @type {[type]}
   */
  content = this.props.content;

  /**
   * Limit this component update
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.index !== nextProps.index) {
      return true;
    }

    if (this.props.content !== nextProps.content) {
      return true;
    }

    return false;
  }

  render() {
    const showIndex = (e) => {
      alert(this.index);
    };

    return (
      <li key={this.index} onClick={showIndex}>{this.content}</li>
    );
  }
}
