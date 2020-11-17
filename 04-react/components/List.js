import React, { PropTypes } from 'react';
import Row from './Row';

class List extends React.Component {
  handlerClick(index) {
    alert(`My index is: ${index}`);
  }

  render() {
    const { dates, children } = this.props;
    return (
      <div>
        {children ? children : null}
        {dates.map((date, index) => (
          <Row
            key={index}
            date={date}
            onClick={() => this.handlerClick(index)}
          />
        ))}
      </div>
    );
  }
}

List.propTypes = {
  dates: PropTypes.array.isRequired,
  children: PropTypes.element,
};

export default List;
