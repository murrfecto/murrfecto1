import React, { useState } from 'react';
import axios from 'axios';
import './Report.scss';
import { Alert } from '@mui/material';

const _ENDPOINT = 'http://localhost:3000/report';
const reportUrl = 'https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf';

const Report = () => {
	const [file, setFile] = useState(null);
	const [formStatus, setFormStatus] = useState(null);

	const openReportHandler = () => {
		window.open(reportUrl, '_blank');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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
			<form onSubmit={handleSubmit} className='formAdding'>
				<h2 className='formAdding__title'>Додайте звіт</h2>
				<div className='formAdding__wrapper'>
					<label>Звіт</label>
					<div>
						<label className='input__file' htmlFor='fileInput'>
							{file ? (
								<div className='input__file_selected'>
									<span className='selected-file-label'>Обраний звіт:</span>
									<span className='selected-file-name'>{file.name}</span>
								</div>
							) : (
								'Оберіть файл звіту'
							)}
						</label>
						<input
							type='file'
							id='fileInput'
							name='report'
							accept='.pdf'
							onChange={handleFileUpload}
							required
							className='input__file_none'
						/>
					</div>
					{file && <button type='submit'>Завантажити або оновити звіт</button>}
					<button type='button' onClick={deleteReportHandler}>
						Видалити звіт
					</button>
					<button type='button' onClick={openReportHandler}>
						Відкрити звіт
					</button>
				</div>
			</form>
		</div>
	);
};

export default Report;
