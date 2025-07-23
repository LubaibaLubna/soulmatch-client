import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default RootLayout;