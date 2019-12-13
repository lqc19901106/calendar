import React from 'react';

const Cell = ({ value, cls }) => {
    return (
        <div className={`${cls} cell`}>{value}</div>
    );
}
export default Cell;
