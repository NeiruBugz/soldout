import { combineReducers } from "redux";
import game from "./game";
import playlists from "./playlists";
import progressBar from "./progressBar";
import tracks from "./track";
import admin from "./admin";
const reducers = combineReducers({
  game,
  playlists,
  progressBar,
  tracks,
  admin
});
export default reducers;
