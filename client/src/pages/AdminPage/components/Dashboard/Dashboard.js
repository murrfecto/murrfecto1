import React, { useEffect} from 'react';
import RootLayout from "../layouts/RootLayout";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

import AddCat from "../AddCat/AddCat";
import ViewAllCats from "../ViewAllCats/ViewAllCats";
import './Dashboard.scss';
import EditCat from "../EditCat/EditCat";
import Report from "../Report/Report";


const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/admin") {
            navigate('/admin/cats/viewAllCats');
        }
    }, [navigate, location]);

    return (
        <div className='container'>
            <div className="dashboard" >
                <RootLayout>
                    <Routes>
                        <Route path="/cats/addCat" element={<AddCat/>}/>
                        <Route path="/cats/viewAllCats/" element={<ViewAllCats/>}/>
                        <Route path="/reports/viewReports/" element={<Report/>}/>
                        <Route path="/cats/editCat/:id/" element={<EditCat/>}/>
                    </Routes>
                </RootLayout>
            </div>
        </div>

    );
};

export default Dashboard;
