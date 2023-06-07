import React, { useEffect, useState,} from 'react';
import {RiEyeLine, RiEyeOffLine} from "react-icons/ri";
import './Login.scss';
import axios from "axios";
import Dashboard from "../components/Dashboard/Dashboard";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store";

const IsAdminForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const sendRequest = async () => {
        const {email, password} = loginData;
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            if (response.status === 200) {
                const token = response.data.token;
                Cookies.set('token', token, {expires: 7});
                dispatch(authActions.login());
                navigate('/admin/cats/viewAllCats');
            }
        } catch (err) {
            console.log(err);
            // Перевірка на помилку авторизації
            if (err.response && err.response.status === 401) {
                // Виведення повідомлення про невірний пароль
                // або невірний емейл
                console.log('Invalid credentials');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
    };

    return (
        <>
            <div className="login">
                <div className="login_container">
                    <div className="login_container__title">Вхід</div>
                    <form className="login_container__form"
                          onSubmit={handleSubmit}>
                        <label htmlFor="">Пароль</label>
                        <div className="password-container">
                            <input
                                className="email"
                                type="email"
                                placeholder="Введіть email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({
                                    ...loginData,
                                    email: e.target.value
                                })}

                            />
                            <input
                                className="password"
                                type={showPassword ? 'text' : 'password'}
                                id="admin-password"
                                value={loginData.password}
                                placeholder="Введіть пароль"
                                onChange={(e) => setLoginData({
                                    ...loginData,
                                    password: e.target.value
                                })}
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
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        dispatch(authActions.login());
                        navigate('/admin/cats/viewAllCats');
                    } else {
                        dispatch(authActions.logout());
                    }
                } catch (err) {
                    console.log(err);
                    dispatch(authActions.logout());
                }
            } else {
                dispatch(authActions.logout());
            }
        };

        checkTokenValidity();
    }, [dispatch]);

    return (
        <>
            {isLoggedIn ? <Dashboard/> : <IsAdminForm/>}

        </>
    );
};

export default AdminPage;