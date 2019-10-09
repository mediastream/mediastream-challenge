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
import moment from 'moment';

export default class MyApp extends React.Component {
    render() {
        const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

        return (
            <div>
                <h1>List Component</h1>
                <List dates={dates} />
                <h1>List Component with child</h1>
                <List dates={dates}>
                    <h2>Child</h2>
                </List>
            </div>
        );
    }
}


class List extends React.Component {
    render() {
        const { dates, children } = this.props;
        return (
            <div>
                { children }
                <ul>{ dates.map((date, i) => <Row key={i} index={i} date={date} />) }</ul>
            </div>
        );
    }
}

List.propTypes = {
    dates: PropTypes.array.isRequired,
    children: PropTypes.element
};


class Row extends React.PureComponent {
    alertIndex = (i) => () => {
        alert(`Index ${i} clicked!`)
    };

    render() {
        const { index, date } = this.props;
        return (
            <li onClick={this.alertIndex(index)}>{ moment(date).format('(DD/MMM/YYYY)') }</li>
        );
    }
}

Row.propTypes = {
    date: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};
