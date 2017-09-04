import React from "react";
import PropTypes from "prop-types";

import cls from "./App.css";

function Title(props) {
  return (
    <h3 className={cls.title}>{props.text}</h3>
  );
}

Title.propTypes = {
  text: PropTypes.string,
};

Title.defaultProps = {
  text: "Never ask an engineer to come up with names.",
};

export default Title;
