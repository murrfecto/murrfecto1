import "./ReportSection.scss";

const ReportSection = () => {
  return (
    <div className="about_wrapper">
      <div className="report_container">
        <a className="report_link" type="button" href="#">
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
