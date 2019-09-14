import { combineReducers } from "redux";
import game from "./game";
import playlists from "./playlists";
import progressBar from "./progressBar";
import tracks from "./track";

const reducers = combineReducers({
  game,
  playlists,
  progressBar,
  tracks,
});

export default reducers;
