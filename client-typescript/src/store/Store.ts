import { combineReducers } from "redux";
import { gameReducer } from "./game/reducers";
import { playlistReducer } from "./playlists/reducers";

export const rootReducer = combineReducers({
  game: gameReducer,
  playlist: playlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
