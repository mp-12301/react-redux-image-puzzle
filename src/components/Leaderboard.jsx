import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import cls from "./App.css";

export function Leaderboard(props) {
  const items = props.leaderboard.map((score, index) =>
    <li key={index} >Name: {score.name}, Moves: {score.moves}</li>);

  return (
    <div className={cls.leaderboard}>
      <h5>Leaderboard</h5>
      <ol>
        {items}
      </ol>
    </div>
  );
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(PropTypes.object),
};

Leaderboard.defaultProps = {
  leaderboard: [],
};

function mapStateToProps(state) {
  return {
    leaderboard: state.game.leaderboard,
  };
}

export default connect(mapStateToProps)(Leaderboard);
