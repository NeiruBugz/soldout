import { combineReducers } from "redux";
import tracks from "./track";
import progressBar from "./progressBar";

const reducers = combineReducers({
  tracks,
  progressBar,
});

export default reducers;
