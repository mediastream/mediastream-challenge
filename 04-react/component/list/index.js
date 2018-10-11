
import React from 'react';
import Row from '../row'

class List extends React.Component {
    render() {
      var data = this.props.dates
      console.log(data)
  
      const renderList = data.map((d, index) => {
        var data = {data: d, index: index};
        return <Row date={data} />
      });
    
      return (
        <ul>{renderList}</ul>
      );
    }
  }

export default List;