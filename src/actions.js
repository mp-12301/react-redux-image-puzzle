import newGrid from "./utils";

/*
 * action types
 */

export const ACTION_TYPES = {
  GAME_LOADING: "GAME_LOADING",
  GAME_LOADED: "GAME_LOADED",
  GAME_FINISHED: "GAME_FINISHED",
  GAME_RESET: "GAME_RESET",
  IMAGE_ERROR: "IMAGE_ERROR",
  PLAYER_DRAG: "PLAYER_DRAG",
  PLAYER_DROP: "PLAYER_DROP",
  UPDATE_LEADERBOARD: "UPDATE_LEADERBOARD",
};

/*
 * Other constants
 */

const ERRORS = {
  IMAGE_ERROR: "Image not valid.",
};

/*
 * action creators
 */

export function loadGame(e) {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.GAME_LOADING,
    });
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = function imgOnLoad() {
          if ("naturalHeight" in this && this.naturalHeight + this.naturalWidth === 0) {
            this.onerror();
          } else if (this.width + this.height === 0) {
            this.onerror();
          } else {
            dispatch({
              type: ACTION_TYPES.GAME_LOADED,
              image: this,
              grid: newGrid(),
            });
          }
          resolve();
        };
        img.onerror = () => {
          dispatch({
            type: ACTION_TYPES.IMAGE_ERROR,
            error: ERRORS.IMAGE_ERROR,
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    });
  };
}

export function dragTile(index) {
  return {
    type: ACTION_TYPES.PLAYER_DRAG,
    index,
  };
}

export function dropTile(index) {
  return {
    type: ACTION_TYPES.PLAYER_DROP,
    index,
  };
}

export function finishGame() {
  return {
    type: ACTION_TYPES.GAME_FINISHED,
  };
}

export function resetGame() {
  return {
    type: ACTION_TYPES.GAME_RESET,
    grid: newGrid(),
  };
}

export function updateLeaderboard(name, place, moves) {
  return {
    type: ACTION_TYPES.UPDATE_LEADERBOARD,
    name,
    place,
    moves,
  };
}

