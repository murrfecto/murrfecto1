import React, {useContext, useState, } from 'react';
import {RiEyeLine, RiEyeOffLine} from "react-icons/ri";
import './Login.scss'
import axios from "axios";
import Dashboard from "../AdminPage/components/Dashboard/Dashboard";
import {UserContext} from "../../context/userContext";

const IsAdminForm = () => {

    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
    });
    const [showPassword, setShowPassword] = useState(false);

    const loginUser=async (e)=>{
        e.preventDefault()
        const {email,password}=loginData
        try {
            const response = await axios.post('http://localhost:3000/login',{
                email,
                password
            })
            if (response.status===2000){
                console.log('ok');
            }else  {
                setLoginData({});
            }
        }catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="login">
                <div className="login_container">
                    <div className="login_container__title">Вхід</div>
                    <form className="login_container__form"
                          onSubmit={loginUser}>
                        <label htmlFor="">Пароль</label>
                        <div className='password-container'>
                            <input
                                className='email'
                                type="email"
                                placeholder='Введіть email'
                                value={loginData.email}
                                onChange={(e)=>setLoginData({...loginData,email:e.target.value})}

                            />
                            <input
                                className="password"
                                type={showPassword ? 'text' : 'password'}
                                id="admin-password"
                                value={loginData.password}
                                placeholder="Введіть пароль"
                                onChange={(e) => setLoginData({...loginData,password: e.target.value})}
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
    const {user} = useContext(UserContext);

    if (!user) return <IsAdminForm/>;

    return (
        <>
            <Dashboard />
        </>
    );
};

export default AdminPage;