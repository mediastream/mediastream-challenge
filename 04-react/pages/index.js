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

  renderDates(dates) {
    return dates.map((date, index) => {
      return <List date={date} key={`${index}-${date}`}/>;
    });
  }

  render() {
    const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

    return (
      <div>
        <h1>04 - React</h1>
        {this.renderDates(dates)}
      </div>
    );
  }
}


class List extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.switchDateParser = this.switchDateParser.bind(this);

    this.parser = {
      true: "moment",
      false: "custom"
    };

    this.state = {
      currentDate: props.date,
      dispalyDate: props.date,
      parser: true,
      displayParser: this.parser[true]
    };
  }

  componentDidMount() {
    const { currentDate, parser } = this.state;
    this.switchDateParser(parser);
  }

  switchDateParser() {
    const { currentDate, parser } = this.state;
    let displayDate;
    const currentParser = !parser;
    const displayParser = this.parser[currentParser];
    const dateParsered = currentParser ? moment(currentDate).format("DD/MMM/YYYY") : this.customParser(currentDate);

    displayDate = `With ${displayParser} parser : ${dateParsered}`;

    this.setState({
      displayDate,
      parser: currentParser,
      displayParser
    });
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

  // TODO
  render() {
    const { displayDate, parser, displayParser } = this.state;

    return (
      <div style={{border: "1px solid blue", marginBottom: "10px", padding: "10px", fontSize: "16px", fontWeight: "bold"}}>
        <p>
          {displayDate}
          <button style={{marginLeft: "10px"}} onClick={() => this.switchDateParser()}>
            {`Switch to ${displayParser} parser`}
          </button>
        </p>
      </div>
    );
  }
}
