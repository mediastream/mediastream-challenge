import React from 'react';
import PropTypes from 'prop-types';
import { Row } from "../Row";

export const List = ({ children, dates = [] }) => {
    return (
        <div>
            {children}
            {dates.map((date, index) =>
                <Row date={date} key={index} index={index} />
            )}
        </div>
    )
}

List.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string)
}