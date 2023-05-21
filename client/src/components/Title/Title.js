import React from "react";
import "./Title.scss";

const Title = ({ text }) => {
    return (
        <div className="title_container">
            <h2 className={"page_title"}>{text}</h2>
        </div>
    );
};

export default Title;