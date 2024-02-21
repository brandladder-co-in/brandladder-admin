import React from 'react';

const AlertBox = ({ user }) => {

    return (
        <div className="alert alert-info">

            {
                user ? (
                    <p>
                        Welcome <b>{user}</b>
                    </p>
                ) : (
                    <p>
                        Should login first
                    </p>
                )
            }

        </div>
    )
}

export default AlertBox
