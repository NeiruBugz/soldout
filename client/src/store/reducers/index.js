import { combineReducers } from "redux";
import game from "./game";
import tracks from "./track";
import progressBar from "./progressBar";

const reducers = combineReducers({
  game,
  tracks,
  progressBar,
});

export default reducers;
