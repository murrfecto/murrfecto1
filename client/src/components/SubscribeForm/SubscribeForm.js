import React, {useState} from 'react';
import './SubscribeForm.scss'
import axios from "axios";

const SubscribeForm = () => {
    const [email, setEmail] = useState('');

    const sendEmailHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/cats/subscribe', {
                email,
            });
            // console.log(res.data);
        } catch (error) {
            // console.log(error);
        }
    };
    return (
        <div className={'subscribe_form'}>
            <h3 className={'subscribe_form-header'}>Стежте за останніми подіями притулку</h3>
            <p className={'subscribe_form-text'}>Залиште свій email, і ми вам надішлемо новини про вашого кота</p>
            <form id={'data-form'} method={'POST'} onSubmit={sendEmailHandler} className={'subscribe_form-form'}>
                <label htmlFor="subscribe">
                    <input
                        name={'subscribe'}
                        placeholder={'Ваш email'}
                        className={'subscribe_form-input'}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button id={'data-form-btn'} className={'subscribe_form-button'}>Надіслати</button>
                </label>
            </form>
        </div>
    );
};

export default SubscribeForm;