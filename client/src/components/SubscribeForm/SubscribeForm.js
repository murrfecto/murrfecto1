import React from 'react';
import './SubscribeForm.scss'

const SubscribeForm = () => {
    return (
        <div className={'subscribe_form'}>
            <h3 className={'subscribe_form-header'}>Стежте за останніми подіями притулку</h3>
            <p className={'subscribe_form-text'}>Залиште свій email, і ми вам надішлемо новини про вашого кота</p>
            <form id={'data-form'} action="" className={'subscribe_form-form'}>
                <label htmlFor="subscribe">
                    <input name={'subscribe'} placeholder={'Ваш email'} className={'subscribe_form-input'} type="text"/>
                    <button id={'data-form-btn'} className={'subscribe_form-button'}>Надіслати</button>
                </label>
            </form>
        </div>
    );
};

export default SubscribeForm;