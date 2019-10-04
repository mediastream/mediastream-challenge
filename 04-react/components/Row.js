import PropTypes from 'prop-types';

const Row = (props) => {
    
    return (
      <div>
        <div onClick={() => props.handleClickDate(props.index)}> {props.date} </div>
      </div>
    );
};

Row.propTypes = {
    date: PropTypes.string.isRequired,
};

export default Row;