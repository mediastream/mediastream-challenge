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
import PropTypes from 'prop-types'
import  * as _ from 'lodash';
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
      const convertDate = (date) => { return moment(date).format('DD/MMM/YYYY')};
      let rows = _.map(this.props.dates,(date, index) => {
          return <Row key={index} index={index} date={ convertDate(date) } />
      });
      let header = this.props.children ? <h3>{this.props.children}</h3> : null;
      return (
          <div>
              { header}
              {rows}
          </div>
      );
  }
}

List.propTypes = {
    dates: PropTypes.array.isRequired
};

class Row extends React.Component {

    render() {
        const showIndex = () => {alert('Index = ' + this.props.index)};
        return (<div onClick={showIndex}>{this.props.date}</div>);
    }
}

Row.propTypes = {
    date: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};
