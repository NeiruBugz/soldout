import * as mongoose from 'mongoose';

export const PlaylistSchema = new mongoose.Schema({
  number: Number,
  name: String,
});
