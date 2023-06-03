import React from 'react';
import './RootLayout.scss'
import Sidebar from "./Sidebar";
const RootLayout = ({children,setIsAdmin}) => {
    return (
        <div className='rootLayout'>
            <Sidebar setIsAdmin={setIsAdmin}/>
            <main className='rootLayout__children'>{children}</main>
        </div>
    );
};

export default RootLayout;