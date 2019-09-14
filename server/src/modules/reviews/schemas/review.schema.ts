import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  score: Number,
  playlists: String,
  bugs: String,
});
