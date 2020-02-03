import { combineReducers } from "redux";
import { gameReducer } from "./game/reducers";
import { playlistReducer } from "./playlists/reducers";
import { progressReducer } from './progress/reducers';
import { tracksReducer } from './tracks/reducers';
import { adminReducer } from './admin/reducers'

export const rootReducer = combineReducers({
  game: gameReducer,
  playlist: playlistReducer,
  progress: progressReducer,
  tracks: tracksReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
