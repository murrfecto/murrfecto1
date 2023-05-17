import React from "react";
import "./Title.scss";
import PropTypes from 'prop-types';

const Title = (props) => {
return (
<div className="title_container">
    <h2 className={"page_title"}>{props.text}</h2>
</div>
);
};

Title.propTypes = {
text: PropTypes.string.isRequired,
}
export default Title