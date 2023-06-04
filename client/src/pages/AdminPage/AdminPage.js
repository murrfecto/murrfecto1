import React, {useState} from 'react';
import './AdminPage.scss';
import Dashboard from "./components/Dashboard/Dashboard";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const IsAdminFrom = ({setIsAdmin}) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const adminPassword = '123123123';

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdmin(adminPassword === password);
    };
    return (
        <>
            <div className="login">
                <div className="login_container">
                    <div className="login_container__title">Вхід</div>
                    <form className="login_container__form"
                          onSubmit={handleSubmit}>
                        <label htmlFor="">Пароль</label>
                        <div className='password-container'>
                            <input
                                className="password"
                                type={showPassword ? 'text' : 'password'}
                                id="admin-password"
                                value={password}
                                placeholder="Введіть пароль"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <RiEyeOffLine
                                    className="eye-icon"
                                    onClick={() => setShowPassword(false)}
                                    size={22}
                                />
                            ) : (
                                <RiEyeLine
                                    className="eye-icon"
                                    onClick={() => setShowPassword(true)}
                                    size={22}
                                />
                            )}
                        </div>

                        <p className="restore">Забули пароль?</p>
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
            <Dashboard setIsAdmin={setIsAdmin}/>
        </>
    );
};

export default AdminPage;