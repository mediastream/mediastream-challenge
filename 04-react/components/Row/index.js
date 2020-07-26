import React from 'react';

export const Row = ({ date, index}) => {

    const formatDate = (dateISO) => {
        const date = new Date(dateISO);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${dt}/${month}/${year}`;
    }

    const handleAlertClick = (index) => {
        alert(`This is the index: ${index}`);
    }

    return (
        <div key={date} onClick={() => handleAlertClick(index)} >
            {formatDate(date)}
        </div>
    )

}
