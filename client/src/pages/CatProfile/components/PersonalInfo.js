import React from 'react';
import './PersonalInfo.scss'
const PersonalInfo = ({type, title, icon}) => {
    return (
        <div className="info__profile">
            <p className="info__profile_title">{type}:</p>
            <div className='info__profile_wrapper'>
                <p className="info__profile_wrapper-options">{title}</p>
                <img className="info__profile_wrapper-icon" src={icon} alt=""/>
            </div>

        </div>
    );
};

export default PersonalInfo;