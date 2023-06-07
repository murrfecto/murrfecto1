import React from 'react';
import './Reports.scss'
import {BiTrash, BiUpload} from "react-icons/bi";
import {AiOutlineEye} from "react-icons/ai";

const Reports = () => {
    return (
        <div className="reports">
            <h1 className="reports__title">Додати звіт</h1>
            <hr/>
            <form className='reports__form'>
                <div className='reports__wrapper'>
                    <label className="reports__selected"
                           htmlFor="fileInput">
                        <span>Оберіть документ</span> <BiUpload size={22} color="black"/>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        required className="input__file_none"
                    />
                    <button>Додати</button>
                </div>
                <div className='icons-group'><AiOutlineEye size={30}/> <BiTrash size={30}/></div>
            </form>
            <hr/>
        </div>
    );
};

export default Reports;
