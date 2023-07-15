import React, { useState } from 'react';
import './SubscribeForm.scss';
import axios from 'axios';
import { Alert } from '@mui/material';
import {_ENDPOINT} from "../../../../variables/variables";

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(false);

    const sendEmailHandler = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError(true);
            return;
        }
        try {
            await axios.post(`${_ENDPOINT}/cats/subscribe`, {
                email,
            });
            setIsSent(true);
            setTimeout(() => {
                setIsSent(false);
            }, 10000);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const validateEmail = (email) => {
        const re = /^[\w-]+(?:\.[\w-]+)*@(?!.*\.ru)(?:[\w-]+\.)+[a-zA-Z]{2,7}$/i;
        return re.test(email);
    };

    return (
        <div className={'subscribe_form'}>
            <h3 className={'subscribe_form-header'}>Стежте за останніми подіями притулку</h3>
            <p className={'subscribe_form-text'}>
                Залиште свій email, і ми вам надішлемо новини про життя притулку
            </p>
            <div className={'subscribe_form-alert'}>
                {isSent ? (
                    <Alert onClose={() => setIsSent(false)}>Повідомлення надіслано, мяв!</Alert>
                ) : error ? (
                    <Alert onClose={() => setError(false)} severity="error">
                        Щось пішло не так, спробуйте ще раз!
                    </Alert>
                ) : null}
            </div>
            <form id={'data-form'} method={'POST'} onSubmit={sendEmailHandler} className={'subscribe_form-form'}>
                <label htmlFor="subscribe" className={'subscribe_form-label'}>
                    <input
                        disabled={error && null}
                        maxLength={40}
                        name={'subscribe'}
                        placeholder={'Ваш email'}
                        className={'subscribe_form-input'}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button id={'data-form-btn'} className={'subscribe_form-button'}>
                        Надіслати
                    </button>
                </label>
            </form>
        </div>
    );
};

export default SubscribeForm;
