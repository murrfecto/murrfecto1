import React from 'react';
import RootLayout from "../layouts/RootLayout";
import {Route, Routes} from "react-router-dom";
import AddCat from "../AddCat/AddCat";
import ViewAllCats from "../ViewAllCats/ViewAllCats";

const Dashboard = () => {
    return (
        <div>
            <RootLayout>
                <Routes>
                    <Route path="/addCat" element={<AddCat />} />
                    <Route path="/viewAllCats" element={<ViewAllCats />} />
                   />
                </Routes>
            </RootLayout>
        </div>
    );
};

export default Dashboard;