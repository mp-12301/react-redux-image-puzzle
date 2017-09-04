import { combineReducers } from "redux";
import GameReducer from "./reducer-game";

const allReducers = combineReducers({
  game: GameReducer,
});

export default allReducers;
