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
	constructor(){
		super();
		this.showIndex = this.showIndex.bind(this);
		this.state = {
			dates : [
						{
							date : '2017-02-20T13:33:52.889Z'
						},
						{
							date : '2013-06-25T14:31:24.888Z', 
							child : 'New Date'
						},
						{
							date : moment().format(), 
							child : 'Today'
						}
					]
		};
	}
	
	showIndex(id){
		alert(`The index is ${id}`);
	}
 	 render() {
		return (
		<div>
			<h1>04 - React</h1>
			<hr/>
				{
					this.state.dates.map((date, indice) => 
						<List 
							date={date.date}
							index={indice}
							key={indice}
							showIndex={this.showIndex}
						>
						{date.child}
						</List>
					)
				}
		</div>
    );
  }
}

class List extends React.Component {  
  header(child){
	  if(child){
		  return <header>{child}</header>
	  }
  }
  render() {
	  const divStyle = {
  		fontSize : '2em',
		cursor : 'pointer', 
		borderBottom : '1px solid red', 
		padding : '5px', 
		fontWeight : 'bold', 
		fontFamily : "Arial"
	  };
    return <div style={divStyle}
				onClick={() => this.props.showIndex(this.props.index)}>
				{
					this.header(this.props.children)
				}
				{moment(this.props.date).utc().format("DD/MMMM/YYYY")}
			</div>
  }
}
