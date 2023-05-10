import React from 'react';
import './Infobox.scss'
import facebook from '../../assets/socials_facebook.svg'
import linkedin from '../../assets/socials_linkedin.svg'
import email from '../../assets/Email.svg'
import phone from '../../assets/phone.svg';
import globe from '../../assets/globe.svg'

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
                    <p>sanders@example.com</p>
                </div>
                <div className={'socials_contacts-phone'}>
                    <img src={phone} alt="phone-icon"/>
                    <p>(505) 555-0125</p>
                </div>

                {/*add translation + dropdown*/}
                <div className={'socials_contacts-translation'}>
                    <img src={globe} alt="globe-icon"/>
                    <p>UA</p>
                </div>


            </div>
        </header>
    );
};

export default Infobox;