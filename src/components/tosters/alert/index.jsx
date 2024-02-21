import React from 'react';

const AlertBox = ({ user }) => {

    return (
        <div className="p-4 shadow-2xl bg-inherit border border-secondary rounded-md">

            {
                user ? (
                    <p className='text-right'>
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
