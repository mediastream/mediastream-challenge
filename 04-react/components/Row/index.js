import React from 'react';

export const Row = ({ date, index }) => {

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

    const handleAlertClickCustom = (index) => {
        alert(`My index: ${index}`);
    }

    return (
        <div style={{ 'cursor': 'pointer', 'color': 'blue' }} key={date} onClick={() => handleAlertClickCustom(index)} >
            {formatDate(date)}
        </div>
    )

}