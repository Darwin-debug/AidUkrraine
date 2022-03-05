import React from 'react';

const Errors = ({ errors }) => {
    if (!errors.length) return null;
    return (
        <div style={{ color: 'red' }}>
            {errors.join(',')}
        </div>
    )
}

Errors.defaultProps = {
    errors: [],
};

export default Errors;