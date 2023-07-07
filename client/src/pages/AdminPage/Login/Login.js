import React, { useEffect, useState,} from 'react';
import {RiEyeLine, RiEyeOffLine} from "react-icons/ri";
import './Login.scss';
import axios from "axios";
import Dashboard from "../components/Dashboard/Dashboard";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store";
import {BiLoaderAlt} from "react-icons/bi";

const IsAdminForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const sendRequest = async () => {
        const {email, password} = loginData;
        try {
            setLoading(true)
            const response = await axios.post('https://murrfecto.foradmin.fun/api/v1/login', {
                email,
                password
            });
            if (response.status === 200) {
                const token = response.data.token;
                Cookies.set('token', token, {expires: 7});
                dispatch(authActions.login());
                navigate('/admin/cats/viewAllCats');
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            setLoading(false)
            // Перевірка на помилку авторизації
            if (err.response && err.response.status === 404 ||401) {
                if (err.response && err.response.status === 404 ||401) {
                    // Виведення повідомлення про невірний пароль
                    // або невірний емейл
                    setEmailError(true);
                    setPasswordError(true);
                }
            }
        }
    };

    console.log(loading);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        sendRequest()
    };

    const LoaderButton = () => {
        return (
                <BiLoaderAlt className="spinner-icon" />
        );
    };

    return (
        <>
            <div className="login">
                <div className="login_container">
                    <div className="login_container__title">Вхід</div>
                    <form className="login_container__form"
                          onSubmit={handleSubmit}>
                        <p className='error'>{passwordError && emailError && 'Електронна пошта або пароль введені неправильно.'}</p>
                        <label htmlFor="">Пароль</label>

                        <div className="password-container">
                            <input
                                className={emailError ? 'email__error' : 'email'}
                                type="email"
                                placeholder="Введіть email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({
                                    ...loginData,
                                    email: e.target.value
                                })}

                            />
                            <input
                                className={passwordError ? 'password__error' : 'password'}
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
                        <button className="btnSubmit">{loading ? <LoaderButton/> : 'Підтвердити' }</button>
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
                    const response = await axios.get('https://murrfecto1.vercel.app/api/v1/profile', {
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
