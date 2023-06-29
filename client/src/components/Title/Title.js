import React from "react";
import "./Title.scss";

const Title = ({ text }) => {
  return (
    <div className="title_container">
      <h1 className={"page_title"}>{text}</h1>
    </div>
  );
};

export default Title;
