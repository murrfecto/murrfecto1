import React from "react";
import "./Title.scss";

const Title = ({text, backgroundImage}) => {
    const titleStyle = {
        backgroundImage: `url(${backgroundImage})`,
        width: '100%',
        backgroundSize: "cover",
        backgroundPosition: "center"
    };
    return (
        <div className="title_container" style={titleStyle}>
            <h1 className={"page_title"}>{text}</h1>
        </div>
    );
};

export default Title;
