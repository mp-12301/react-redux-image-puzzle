import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Tile from "./Tile";

import cls from "./App.css";

function Tileset(props) {
  const { grid } = props;
  const tiles = grid.map((tile, index) => <Tile key={tile} tile={tile} index={index} />);
  return (
    <div className={cls.tileset} >
      { tiles }
    </div>
  );
}
Tileset.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.number),
};

Tileset.defaultProps = {
  grid: [],
};
function mapStateToProps(state) {
  return {
    grid: state.game.grid,
  };
}

export default connect(mapStateToProps)(Tileset);
