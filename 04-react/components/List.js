import React from "react";
import Row from "./Row";
import PropTypes from 'prop-types'

class List extends React.Component {
  render() {
    const { dates, children } = this.props;
    return (
      <div>
        {children}
        <ul>
          {dates.map((d, i) => (
            <Row key={i} position={i} date={d} />
          ))}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  dates: PropTypes.array.isRequired,
  children: PropTypes.element
};

export default List;
