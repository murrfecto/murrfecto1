import React, {useEffect} from 'react';
import RootLayout from "../layouts/RootLayout";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import AddCat from "../AddCat/AddCat";
import ViewAllCats from "../ViewAllCats/ViewAllCats";
import './Dashboard.scss'
const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/admin") {
            navigate('/admin/cats/viewAllCats'); // Перенаправлення на
            // "/admin/addCat"
        }
    }, [navigate, location]);
    return (
        <div className='dashboard'>
            <RootLayout>
                <Routes>
                    <Route path="/cats/addCat" element={<AddCat />} />
                    <Route path="/cats/viewAllCats" element={<ViewAllCats />} />
                   />
                </Routes>
            </RootLayout>
        </div>
    );
};

export default Dashboard;