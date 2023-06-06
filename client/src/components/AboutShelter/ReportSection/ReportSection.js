import './ReportSection.scss';

const reportUrl = 'https://murrfecto.s3.eu-central-1.amazonaws.com/report.pdf';

const ReportSection = () => {
	return (
		<div className='about_wrapper container'>
			<div className=' report_container'>
				<a
					className='report_link'
					type='button'
					href={reportUrl}
					target='_blank'
					rel='noopener noreferrer'
				>
					Звітність
				</a>

				<p className='report_text'>
					Ми офіційно зареєстрована некомерційна організація і звітуємо про свою
					діяльність
				</p>
			</div>
		</div>
	);
};

export default ReportSection;
