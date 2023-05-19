import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './Spinner.scss'
const Spinner = () => {
    return (
        <div className="spinner">
            <AiOutlineLoading3Quarters className="spinner-icon" />
        </div>
    );
};

export default Spinner;