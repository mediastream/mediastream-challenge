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

import React, {PropTypes} from 'react';
import moment from 'moment'

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

  onRowClick(i) {
    alert(`Hey you just clicked date number ${i + 1}!!`)
  }

  render() {
    const {children, dates} = this.props
    return (
      <div>
        {children}
        <ul>
          {dates.map((date, i) => (
            <Row date={date} i={i} key={i} onClick={this.onRowClick}/>
          ))}
        </ul>
      </div>
    )
  }

  static propTypes = {
    dates: PropTypes.array,
    children: PropTypes.element
  }
}

const Row = ({date, i, onClick}) => (
  <li>
    <a href="#" onClick={() => onClick(i)}>
      ({moment(date).format('DD/MM/YYYY')})
    </a>
  </li>
)

Row.propTypes = {
  date: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}
