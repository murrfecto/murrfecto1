
import React, {useEffect} from 'react';
import RootLayout from "../layouts/RootLayout";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import AddCat from "../AddCat/AddCat";
import ViewAllCats from "../ViewAllCats/ViewAllCats";
import './Dashboard.scss'
import Reports from "../Reports/Reports";
const Dashboard = ({setIsAdmin}) => {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/admin") {
            navigate('/admin/cats/viewAllCats');
        }
    }, [navigate, location]);
    return (
        <div className='dashboard'>
            <RootLayout setIsAdmin={setIsAdmin}>
                <Routes>
                    <Route path="/cats/addCat" element={<AddCat />} />
                    <Route path="/cats/viewAllCats" element={<ViewAllCats />} />
                    <Route path="/reports/viewReports" element={<Reports/>} />
                   />
                </Routes>
            </RootLayout>
        </div>
    );
};

export default Dashboard;
