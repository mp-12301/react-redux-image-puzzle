import { ACTION_TYPES } from "../actions";

export default function (state = {
  loading: false,
  loaded: false,
  finished: false,
  leaderboard: [],
  grid: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  error: null,
  image: null,
  dragging: -1,
  moves: 0,
  place: -1,
}, action) {
  switch (action.type) {
    case ACTION_TYPES.GAME_LOADING:
      return { ...state, loading: true, loaded: false };
    case ACTION_TYPES.GAME_LOADED: {
      return {
        ...state,
        image: action.image,
        loaded: true,
        grid: action.grid,
        leaderboard: [],
        moves: 0,
        loading: false,
        dragging: false,
        finished: false,
        place: -1,
      };
    }
    case ACTION_TYPES.GAME_RESET: {
      return {
        ...state,
        image: action.image,
        loaded: true,
        grid: action.grid,
        moves: 0,
        loading: false,
        dragging: false,
        finished: false,
        place: -1,
      };
    }
    case ACTION_TYPES.GAME_FINISHED: {
      let place = state.place;
      for (let i = 0; i < state.leaderboard.length; i += 1) {
        if (state.leaderboard[i].moves > state.moves) {
          place = i;
          break;
        }
      }
      if (place === -1) {
        place = state.leaderboard.length;
      }
      return { ...state, place };
    }
    case ACTION_TYPES.UPDATE_LEADERBOARD: {
      let leaderboard = state.leaderboard.slice();
      leaderboard.splice(action.place, 0, { name: action.name, moves: action.moves });
      leaderboard = leaderboard.slice(0, 5);
      return { ...state, leaderboard, place: -1 };
    }
    case ACTION_TYPES.PLAYER_DRAG:
      return { ...state, dragging: action.index };
    case ACTION_TYPES.PLAYER_DROP: {
      const grid = state.grid.slice();
      const a = grid[action.index];
      grid[action.index] = grid[state.dragging];
      grid[state.dragging] = a;

      let finished = state.finished;
      for (let i = 0; i < grid.length; i += 1) {
        if (i !== grid[i]) {
          break;
        }
        finished = (i === grid.length - 1);
      }

      return {
        ...state,
        dragging: false,
        moves: state.moves + 1,
        grid,
        finished,
      };
    }
    case ACTION_TYPES.IMAGE_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
