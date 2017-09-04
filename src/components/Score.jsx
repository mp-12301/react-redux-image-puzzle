import React from "react";
import PropTypes from "prop-types";

import cls from "./App.css";

function Score(props) {
  return (
    <div className={cls.score}>{props.moves} moves</div>
  );
}

Score.propTypes = {
  moves: PropTypes.number,
};

Score.defaultProps = {
  moves: 0,
};

export default Score;
