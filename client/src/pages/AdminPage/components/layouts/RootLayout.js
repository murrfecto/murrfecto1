import React from 'react';
import './RootLayout.scss'
import Sidebar from "./Sidebar";
const RootLayout = ({children}) => {
    return (
        <div className='rootLayout'>
            <Sidebar/>
            <main className='rootLayout__children'>{children}</main>
        </div>
    );
};

export default RootLayout;