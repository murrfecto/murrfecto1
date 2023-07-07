import React, { useState } from 'react';
import axios from 'axios';
import './Report.scss';
import { Alert } from '@mui/material';
import Spinner from '../../../../helpers/Spinner/Spinner';
import {BiTrash, BiUpload} from "react-icons/bi";
import {AiOutlineEye} from "react-icons/ai";
import {Link} from "react-router-dom";
const _ENDPOINT = 'https://murrfecto.foradmin.fun/api/v1/report';
const reportUrl = 'https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf';
const Report = () => {
	const [file, setFile] = useState(null);
	const [formStatus, setFormStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const openReportHandler = () => {
		window.open(reportUrl, '_blank');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const data = new FormData();
			data.append('filename', 'report.pdf');
			data.append('report', file);

			await axios.post(_ENDPOINT, data);

			setFormStatus({ status: 'success', description: 'Звіт додано!' });
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
				const config = { headers: { filename: 'report.pdf' } };
				await axios.delete(_ENDPOINT, config);

				setFormStatus({ status: 'success', description: 'Звіт видалено!' });
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
								):'Оберіть документ' }
								</span> <BiUpload size={22} color='#4B3542
'/>
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
								<Link to='/report'>
									<AiOutlineEye color='#4B3542' size={30} id={'data-report'}>
									</AiOutlineEye>
								</Link>

								<BiTrash size={30} id={'data-report'} onClick={deleteReportHandler} color='#4B3542'/>
							</div>
						</>
				</div>
				<hr/>
			</form>
		</div>
	);
};

export default Report;
