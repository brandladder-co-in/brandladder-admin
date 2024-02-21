import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmailAuth from '../../../hooks/auth/useEmailAuth';
import SidebarNavigation from '../../navbars/sidebar';
import TopbarNavigation from '../../navbars/topbar';

const DashBoard = ({ children }) => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    const navigate = useNavigate();
    const { currentUser } = useEmailAuth();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        if (currentUser === null) {
            navigate('/')
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <>
            {isMobileScreen ? (
                <TopbarNavigation children={children} />
            ) : (
                <SidebarNavigation children={children} />
            )}
        </>
    );
};

export default DashBoard;
