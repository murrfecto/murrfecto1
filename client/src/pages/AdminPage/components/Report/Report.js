import React, {useState} from 'react';
import axios from 'axios';
import './Report.scss';
import {Alert} from '@mui/material';
import { BiUpload} from "react-icons/bi";

import {Link} from "react-router-dom";
import {_ENDPOINT} from "../../../../variables/variables";
import {IoEyeOutline, IoTrashOutline} from "react-icons/io5";


const reportUrl = './images/report.pdf';
const Report = () => {
    const [file, setFile] = useState(null);
    const [formStatus, setFormStatus] = useState(null);
    const [_, setIsLoading] = useState(false);

    // const openReportHandler = () => {
    //     window.open(reportUrl, '_blank');
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData();
            data.append('filename', 'report.pdf');
            data.append('report', file);

            await axios.post(`${_ENDPOINT}/report`, data);

            setFormStatus({status: 'success', description: 'Звіт додано!'});
            setFile(null);
        } catch (err) {
            setFormStatus({
                status: 'error',
                description: 'Під час завантаження звіту сталася помилка.',
            });
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        setFormStatus(null);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const deleteReportHandler = async () => {
        const confirmed = window.confirm('Ви дійсно хочете видалити звіт?');

        if (confirmed) {
            setIsLoading(true);
            try {
                const config = {headers: {filename: 'report.pdf'}};
                await axios.delete(_ENDPOINT, config);

                setFormStatus({status: 'success', description: 'Звіт видалено!'});
            } catch (err) {
                setFormStatus({
                    status: 'error',
                    description: 'Під час видалення звіту сталася помилка.',
                });
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {formStatus && (
                <Alert
                    className={`alert-${formStatus.status}`}
                    severity={formStatus.status}
                >
                    {formStatus.description}
                </Alert>
            )}
            <form onSubmit={handleSubmit} className='reports'>
                <h2 className='reports__title'>Додайте звіт</h2>
                <hr/>
                <div className='reports__form'>
                    <div className='reports__wrapper'>
                        <label className="reports__selected"
                               htmlFor="fileInput">
							<span>
								{file ? (
                                    <div className='input__file_selected'>
                                        <span className='selected-file-label'>Обраний звіт:</span>
                                        <span className='selected-file-name'>{file.name}</span>
                                    </div>
                                ) : 'Оберіть документ'}
								</span> <BiUpload size={24} color='#4B3542'/>
                        </label>
                        <input
                            type='file'
                            id='fileInput'
                            name='report'
                            accept='.pdf'
                            onChange={handleFileUpload}
                            required
                        />
                        <button>Додати</button>
                        <label className='input__file' htmlFor='fileInput'>

                        </label>
                    </div>
                    <>
                        <div className='icons-group'>
                            <Link className='eye' to='/report'>
                                <IoEyeOutline color='#4B3542' size={24} id={'data-report'}>
                                </IoEyeOutline>
                            </Link>
                            <IoTrashOutline size={24} id={'data-report'} onClick={deleteReportHandler} color='#4B3542'/>
                        </div>
                    </>
                </div>
                <hr/>
            </form>
        </div>
    );
};

export default Report;
