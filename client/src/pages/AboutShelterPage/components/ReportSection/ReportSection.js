import "./ReportSection.scss";
import { Link } from "react-router-dom";
import React from "react";

const ReportSection = () => {
  return (
      <div className=" report_container">
        <Link to={"/report"} className="report_link">
          Звітність
        </Link>

        <p className="report_text">
          Ми офіційно зареєстрована некомерційна організація і звітуємо про свою
          діяльність
        </p>
      </div>
  );
};

export default ReportSection;
