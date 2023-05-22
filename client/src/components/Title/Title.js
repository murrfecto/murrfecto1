import React from "react";
import "./Title.scss";
import PropTypes from 'prop-types';

const Title = ({ text }) => {
  return (
    <div className="title_container">
      <h2 className={"page_title"}>{text}</h2>
    </div>
  );
};

export default Title;
