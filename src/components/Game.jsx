import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { loadGame, finishGame, resetGame } from "../actions";

import cls from "./App.css";

import Title from "./Title";
import Tileset from "./Tileset";
import ImageInput from "./ImageInput";
import ResetButton from "./ResetButton";
import Score from "./Score";
import Leaderboard from "./Leaderboard";
import PromptScore from "./PromptScore";

export class Game extends Component {
  componentDidUpdate(prevProps) {
    const { finished } = this.props;
    if (prevProps.finished === false && finished === true) {
      this.props.finishGame();
    }
  }

  render() {
    return (
      <div className={cls.game} >
        <Title text="Image puzzle game" />
        <Tileset />
        <ImageInput onChange={this.props.loadGame} />
        <ResetButton onClick={this.props.resetGame} />
        <Score moves={this.props.moves} />
        <Leaderboard />
        <PromptScore />
      </div>
    );
  }
}

Game.propTypes = {
  finished: PropTypes.bool,
  moves: PropTypes.number,
  finishGame: PropTypes.func,
  loadGame: PropTypes.func,
  resetGame: PropTypes.func,
};

Game.defaultProps = {
  finished: false,
  moves: 0,
  loadGame: () => {},
  finishGame: () => {},
  resetGame: () => {},
};

function mapStateToProps(state) {
  return {
    finished: state.game.finished,
    moves: state.game.moves,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loadGame,
    finishGame,
    resetGame,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);
