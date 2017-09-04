import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateLeaderboard } from "../actions";

class PromptScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
    this.updateData = this.updateData.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateData(event) {
    this.setState({ input: event.target.value });
  }

  submit() {
    this.props.updateLeaderboard(this.state.input, this.props.place, this.props.moves);
    this.setState({ input: "" });
  }

  render() {
    return (
      <div>
        {(this.props.place >= 0
          && this.props.place < 5
          && this.props.finished) &&
          <div>
            <div>Congralutations, you have reached the top scores.
              Enter your name in the leaderboard.</div>
            <input type="text" onChange={this.updateData} />
            <button onClick={this.submit}>Enter Score</button>
          </div>
        }
      </div>
    );
  }
}

PromptScore.propTypes = {
  place: PropTypes.number,
  moves: PropTypes.number,
  updateLeaderboard: PropTypes.func,
  finished: PropTypes.bool,
};

PromptScore.defaultProps = {
  place: -1,
  moves: 0,
  updateLeaderboard: () => {},
  finished: false,
};

function mapStateToProps(state) {
  return {
    finished: state.game.finished,
    moves: state.game.moves,
    place: state.game.place,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    updateLeaderboard,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PromptScore);
