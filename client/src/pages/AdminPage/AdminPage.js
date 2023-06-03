import React, {useState} from 'react';
import './AdminPage.scss';
import Dashboard from "./components/Dashboard/Dashboard";

const IsAdminFrom = ({setIsAdmin}) => {
    const [password, setPassword] = useState('');

    const adminPassword = '123123123';

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdmin(adminPassword === password);
    };
    return (
        <>
            <div className="login">
                <div className="login_container">
                    <div className="login_container__title"></div>
                    <form className="login_container__form"
                          onSubmit={handleSubmit}>
                        <input
                            className="password"
                            type="password"
                            id="admin-password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btnSubmit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    if (!isAdmin) return <IsAdminFrom setIsAdmin={setIsAdmin}/>;

    return (
        <>
            <Dashboard setIsAdmin={setIsAdmin} />
        </>
    );
};

export default AdminPage;