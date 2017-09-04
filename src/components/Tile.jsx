import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { dragTile, dropTile } from "../actions";

import cls from "./App.css";

class Tile extends Component {
  constructor(props) {
    super(props);

    this.dragOver = (event) => {
      event.preventDefault();
    };
    this.drag = (event) => {
      if (this.props.finished) {
        event.preventDefault();
      } else {
        event.dataTransfer.setData("text", event.target.id);
        this.props.dragTile(this.props.index);
      }
    };
    this.drop = (event) => {
      if (this.props.finished === false) {
        this.props.dropTile(this.props.index);
      }
      event.preventDefault();
    };
  }

  componentWillUpdate(newProps) {
    const img = newProps.image;
    if (img) {
      const tilePerLine = 3;
      const tileIndex = newProps.tile;
      const tileWidth = img.width / 3;
      const tileHeight = img.height / 3;
      const sx = (tileIndex % tilePerLine) * tileWidth;
      const sy = Math.floor(tileIndex / tilePerLine) * tileHeight;
      const ctx = this.canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, img.width, img.height, 0, 0, 300, 300);
    }
  }

  render() {
    const { tile, index } = this.props;
    return (
      <div id={`Tile-${tile}-${index}`} className={cls.tile} draggable="true" onDrop={this.drop} onDragOver={this.dragOver} onDragStart={this.drag}>
        <canvas width="100" height="100" ref={(c) => { this.canvas = c; }} />
      </div>
    );
  }
}

Tile.propTypes = {
  index: PropTypes.number,
  tile: PropTypes.number,
  finished: PropTypes.bool,
  dropTile: PropTypes.func,
  dragTile: PropTypes.func,
};

Tile.defaultProps = {
  index: 0,
  tile: 0,
  finished: false,
  dropTile: () => {},
  dragTile: () => {},
};

function mapStateToProps(state) {
  return {
    image: state.game.image,
    finished: state.game.finished,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ dragTile, dropTile }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Tile);
