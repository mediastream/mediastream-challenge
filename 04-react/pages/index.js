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

import React, { Component, PropTypes } from 'react';
import moment from "moment";

export default class AppDates extends Component {
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


class List extends Component {
  static propTypes = {
    dates: PropTypes.array,
    index: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.parseDate = this.parseDate.bind(this);
    this.row = this.row.bind(this);

    this.parser = {
      true: "moment",
      false: "custom"
    };

    const parser = false;

    this.state = {
      parser,
      displayParser: this.parser[parser]
    };
  }

  parseDate(date) {
    const { parser } = this.state;
    let displayDate;
    const displayParser = this.parser[currentParser];
    const dateParsered = parser ? moment(date).format("DD/MMM/YYYY") : this.customParser(date);
    displayDate = `With ${displayParser} parser : (${dateParsered})`;

    return displayDate;
  }

  showOwnIndex(index) {
    alert(`My index is ${index}`);
  }

  customParser(date) {
    const months = {
      0: "Ene",
      1: "Feb",
      2: "Mar",
      3: "Abr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Ago",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dic"
    };

    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return `${day}/${months[month]}/${year}`;
  }

  row() {
    const { dates, children, index } = this.props;

    return dates.map((date, index) => {
      return (
        <div key={`${new Date * 1}-${index}`} style={{border: "border:1px solid green"}}>
          <p>
            {this.customParser(date)}
            <button style={{marginLeft: "10px"}} onClick={() => this.showOwnIndex(index)}>
              {`Show my index`}
            </button>
          </p>
        </div>
      );
    })
  }

  // TODO
  render() {
    
    const { children } = this.props;

    return (
      <div style={{border: "1px solid blue", marginBottom: "10px", padding: "10px", fontSize: "16px", fontWeight: "bold"}}>
        {this.row()}
        <hr/>
        {children}
      </div>
    );
  }
}
