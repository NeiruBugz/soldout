import * as mongoose from 'mongoose';

export const PlaylistSchema = new mongoose.Schema({
  playlistId: Number,
  name: String,
});
