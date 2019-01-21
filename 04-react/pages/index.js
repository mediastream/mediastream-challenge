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

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function convertDate(dateStr) {
    const matchesISODate = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(dateStr);
    if (!matchesISODate) {
        return 'invalid';
    }
    const ts = Date.parse(dateStr);
    if (isNaN(ts)) {
        return 'invalid';
    }
    const date = new Date(ts);
    return date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear();
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myIndex: this.props.myIndex

        };
    }

    render() {
        const myIndex = this.state.myIndex;
        return <li onClick={function () {
            alert('My Index is ' + myIndex);
        }}>{convertDate(this.props.date)}</li>;
    }
}

class List extends React.Component {
    render() {
        const dates = this.props.dates;
        const listItems = dates.map((date, index) =>
            <Row myIndex={index}
                 key={index.toString()}
                 date={date}

            />
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default class MyApp extends React.Component {
    render() {
        const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

        return (
            <div>
                <h1>04 - React</h1>
                <List dates={dates}/>
                <hr/>
                <List dates={dates}>
                    <h1>Optional Header</h1>
                </List>
            </div>
        );
    }
}

