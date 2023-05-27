import './DonateForm.scss';
import FormSelect from '../FormSelect/FormSelect';
import axios from 'axios';
import { useState } from 'react';

const DonateForm = ({ title }) => {
	const [donationAmount, setDonationAmount] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const orderBody = {
			amount: donationAmount,
		};
		try {
			const response = await axios.post(
				'http://localhost:3000/payment',
				orderBody
			);
			window.location.replace(response.data.checkoutUrl);
		} catch (error) {
			console.error('An error occurred while processing the payment', error);
		}
	};

	const handleDonationAmountChange = (e) => {
		setDonationAmount(e.target.value);
	};

	const handleCustomAmountClick = () => {
		setDonationAmount('');
	};

	const donationOptions = ['20', '50', '100', '200'];

	return (
		<div className='donate-slider_wrap'>
			<h3 className='donate-slider_title'>{title}</h3>
			<form className='donate-form' onSubmit={handleSubmit}>
				<div className='donate-form_box'>
					{donationOptions.map((option) => (
						<div className='donate-form_box-count' key={option}>
							<input
								type='radio'
								name='donation_number'
								id={option}
								value={option}
								onChange={handleDonationAmountChange}
								hidden
							/>
							<label
								htmlFor={option}
								className={`donate-form_radio-label ${
									donationAmount === option && 'donate-form_checked'
								}`}
							>
								<span className='donate-form_number'>{option}</span>
							</label>
						</div>
					))}
					<div className='donate-form_input-count'>
						<input
							className='donate-form_input-free'
							type='number'
							name='donation_free'
							value={donationAmount}
							onChange={handleDonationAmountChange}
							onClick={handleCustomAmountClick}
							placeholder='Інша сума, UAH'
							min='0'
							step='1'
						/>
					</div>
				</div>
				<FormSelect />
				<div>
					<input className='donate-form_btn' type='submit' value='Допомогти' />
				</div>
			</form>
		</div>
	);
};

export default DonateForm;
