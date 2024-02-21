import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthenticateRoutes, UnAuthenticateRoutes } from './navroutes'

const Navigations = () => {

    const isAuthenticated = true;
    return (
        <Routes>
            {UnAuthenticateRoutes.map((data, index) => (
                <Route key={index} path={data.path} element={data.element} />
            ))}
            {AuthenticateRoutes.map((data, index) => (
                isAuthenticated ? (
                    <Route key={index} path={data.path} element={data.element} />
                ) : (
                    <Route key={index} path={data.path} element={<Navigate to="/" replace />} />
                )
            ))}
        </Routes>
    )
}

export default Navigations
