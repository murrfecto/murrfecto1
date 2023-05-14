import React from 'react';
import './Infobox.scss'
import linkedin from '../../assets/socials_linkedin.svg'
import facebook from '../../assets/socials_facebook.svg'
import email from '../../assets/Email.svg'
import phone from '../../assets/phone.svg';

const Infobox = () => {
    return (
        <header>
            <div className={'header_socials '}>
                <img src={facebook} alt="facebook-icon"/>
                <img src={linkedin} alt="linkedin-icon"/>
            </div>

            <div className={'socials_contacts'}>
                <div className={'socials_contacts-email'}>
                    <img src={email} alt="email-icon"/>
                    <p>info@murrfecto.site</p>
                </div>
                <div className={'socials_contacts-phone'}>
                    <img src={phone} alt="phone-icon"/>
                    <p>+38 063 628 6630</p>
                </div>
            </div>
        </header>
    );
};

export default Infobox;