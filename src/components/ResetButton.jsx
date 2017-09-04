import React from "react";
import PropTypes from "prop-types";

import cls from "./App.css";

function ResetButton(props) {
  return (
    <div className={cls.button}>
      <button onClick={props.onClick}>Reset game</button>
    </div>
  );
}

ResetButton.propTypes = {
  onClick: PropTypes.func,
};

ResetButton.defaultProps = {
  onClick: () => {},
};

export default ResetButton;
