import "./ReportSection.scss";

const ReportSection = () => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="about_wrapper">
      <div className="report_container">
        <a className="report_link" type="button" href="#" onClick={handleClick}>
          Звітність
        </a>

        <p className="report_text">
          Ми офіційно зареєстрована некомерційна організація і звітуємо про свою
          діяльність
        </p>
      </div>
    </div>
  );
};

export default ReportSection;
