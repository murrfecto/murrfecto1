import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.scss';
import { Alert } from '@mui/material';

const _ENDPOINT = 'http://localhost:3000/report';
const Report = () => {
	// use form values to send data on post

	const [file, setFile] = useState(null);
	const [formStatus, setFormStatus] = useState('');

	const reportUrl =
		'https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf';

	const handleSubmit = async (e) => {
		const data = new FormData();
		data.append('filename', 'report.pdf');
		data.append('report', file, 'report');
		e.preventDefault();
		console.log(data);
		try {
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
		console.log(e);
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const deleteReportHandler = async () => {
		const confirmed = window.confirm('Ви дійсно хочете видалити звіт?');

		if (confirmed) {
			try {
				const config = {
					headers: {
						filename: 'report.pdf',
					},
				};
				await axios.delete(_ENDPOINT, config);
				setFormStatus('success');
			} catch (err) {
				setFormStatus('error');
				console.error(err);
			}
		}
	};

	return (
		<div>
			<a href={reportUrl}>Завантажити звіт</a>
			{formStatus === 'success' && (
				<Alert className={'alert-success'} severity='success'>
					Звіт додано!
				</Alert>
			)}
			{formStatus === 'error' && (
				<Alert className={'alert-error'} severity='error'>
					Під час завантаження звіту сталася помилка.
				</Alert>
			)}
			<form onSubmit={handleSubmit} className='formAdding'>
				<h2 className='formAdding__title'>Додайте звіт</h2>
				<div className='formAdding__wrapper'>
					<label>Звіт</label>
					<div>
						<label className='input__file' htmlFor='fileInput'>
							{file !== null ? (
								<div className='input__file_selected'>
									<span className='selected-file-label'>Вибраний звіт:</span>
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

					<button type='submit'>Завантажити або оновити звіт</button>
					<button type='button' onClick={deleteReportHandler}>
						Видалити звіт
					</button>
				</div>
			</form>
		</div>
	);
};

export default Report;
